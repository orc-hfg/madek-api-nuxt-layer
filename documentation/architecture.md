# Architektur

## Schichten-Aufbau

### Übersicht der Schichten (Client → Server)

```
Store (app/stores/)
  ↓ Business Logic / State Management
Service (app/services/)
  ↓ Data Transformation / Field Mapping
Repository (app/repositories/)
  ↓ API Calls zu Nitro Server Endpoints
Server API Endpoint (server/api/)
  ↓ Request Handling / Validation
Server Service (server/madek-api-services/)
  ↓ Externe API Calls + Business Logic
Externe Madek API
```

### Verantwortlichkeiten

#### Store (`app/stores/`)
- **Backend for Frontend (BFF)** auf Client-Seite
- State Management für Vue Components
- Orchestrierung mehrerer Service-Calls
- Daten liegen bereits in UI-freundlicher, finaler Form vor
- Reaktive Daten-Container für direkten Zugriff aus Components

#### Service (`app/services/`)
- Field-Mapping (z.B. `SET_META_KEYS` für locale-spezifische Meta-Keys)
- Datentransformation (Label + Value zusammenführen)
- Abstraktion über Repository-Layer

#### Repository (`app/repositories/`)
- API-Calls zu **eigenen Nitro Server Endpoints** (nicht externe API!)
- Type-safe API-Zugriff
- Verwendet das `madek-api` Plugin für HTTP-Requests

##### Plugin (`app/plugins/madek-api.ts`)
- HTTP-Client-Layer via `$fetch.create()`
- Cookie-Forwarding für SSR (Server → Server)
- BaseURL-Konfiguration für eigene Nitro-Endpoints
- Zentrale Request/Response-Hooks (`onRequest`, `onResponseError`)

#### Server API Endpoint (`server/api/`)
- Nitro HTTP Endpoints (z.B. `/api/collection/[id]/meta-datum/[key]`)
- **Request Validation** via Zod-Schemas:
  - Route-Parameter (z.B. `collection_id`, `media_entry_id`)
  - Query-Parameter (z.B. `media_type`)
- **Mock-Daten-Handling** für Tests (`getApiMockOrExecute`)
- Delegierung an Server Services

#### Server Service (`server/madek-api-services/`)
- **Zentrale Business-Logik** (Fallbacks, 404-Handling, Normalisierung)
- Calls zur **externen Madek API** via `createMadekApiClient()`
- Server-seitiges Caching
- Text-Normalisierung (Trimming, Line Endings)
- **Error Handling** via `handleServiceError()`:
  - FetchError → H3Error Konvertierung
  - Konsistente HTTP-Status-Codes
  - Logging von Fehlern
  - Type-safe Error Detection (duck-typing)

##### Madek API Client (`server/utils/madek-api.ts`)
- HTTP-Client für externe Madek API
- BaseURL-Konfiguration für externe API (`https://dev.madek.hfg-karlsruhe.de/api-v2`)
- **Umgebungs-spezifische Authentifizierung**:
  - Development: API-Token (`Authorization: token ...`)
  - Production: Cookie-Forwarding vom Client
- Cache-Entscheidungslogik (authenticated vs. public data)
- Cache-Key-Generierung für Server-Cache (sortierte Query-Parameter)
- **Path Parameter Replacement** (`:collectionId` → `123`)
- Query Parameter Handling

### URL-Transformation (Client → Server → Externe API)

**1. Client-Side Repository**
```typescript
$madekApi('/collection/123/meta-datum/madek_core:title')
```

**2. Madek API Plugin (`app/plugins/madek-api.ts`)**
```typescript
baseURL: `${config.app.baseURL}${apiBaseName}`
```
Ergebnis: `http://localhost:3000/api/collection/123/meta-datum/madek_core:title`

**3. Nitro Server API Endpoint** empfängt Request

**4. Nitro Server Madek API Client (`server/utils/madek-api.ts`)**
```typescript
const apiBaseURL = publicConfig.madekApi.baseURL
// → https://dev.madek.hfg-karlsruhe.de/api-v2
```
Ergebnis: `https://dev.madek.hfg-karlsruhe.de/api-v2/collection/123/meta-datum/madek_core:title`

**5. Externe Madek API** empfängt Request und antwortet

### Daten-Transformation (Beispiel-Response-Flow)

```
Externe Madek API
  ↓ sendet: raw JSON (alle Felder)
Server Service (führt aus: Daten-Filterung, Text-Normalisierung, Fallbacks, 404-Handling)
  ↓ sendet: gefilterte, normalisierte, typisierte Daten (nur benötigte Felder)
Server API Endpoint
  ↓ sendet: HTTP Response
Repository
  ↓ sendet: TypeScript CollectionMetaDatum
Service (führt aus: Label + Value kombinieren, Locale-Mapping)
  ↓ sendet: StringMetaKeyFieldData {label, value}
Store (führt aus: UI-Struktur aufbauen)
  ↓ sendet: Reaktive Daten (titleAlternativeLocale, etc.)
Component in App (verwendet: Direkter Zugriff)
```

**Beispiel-Transformation:**
- **Externe API**: `{"meta-data": {"string": "  Mein Titel\r\n"}, ...}`
- **Server Service**: Trimming → `"Mein Titel"`, People/Keywords normalisiert
- **Repository**: TypeScript `CollectionMetaDatum` Typ
- **Service**: `{label: "Titel", value: "Mein Titel"}`
- **Store**: `titleAlternativeLocale: {label: "Title", value: "My Title"}`
- **Component**: Direkter Zugriff via `setData.titleAlternativeLocale.value`

### Warum diese Trennung?

- ✅ **Separation of Concerns**: Jede Schicht hat klare Verantwortlichkeiten
- ✅ **Server-seitige Business-Logik**: Fallbacks, Caching, Normalisierung zentral an einem Ort
- ✅ **Type Safety**: End-to-end TypeScript von Store bis API
- ✅ **Testbarkeit**: Jede Schicht kann isoliert getestet werden
- ✅ **Wiederverwendbarkeit**: Services können von mehreren Stores verwendet werden

# Caching

## Serverseitiges Caching (BFF)

- Nutzerneutrale Daten können auf Server gecached werden, ohne besonderen Cache Key zu brauchen, der z.B. die User ID enthält
- Cross-request state pollution möglich, wenn nicht immer ein eindeutiger Key je Nutzer verwendet wird
- Deshalb nur nutzerneutrale Daten auf Server cachen

## Clientseitiges Caching

- Nutzerspezifische Daten können clientseitig gecached werden (`getCachedData` / `useCachedAsyncData`)
- Cache bleibt auch nach Reload erhalten, erst Ende der Session löscht den Cache
- Debugging über Nuxt Dev Tools möglich: Keyed State from useAsyncData
- Keine cross-request state pollution mit `useAsyncData` / `useFetch`, da automatisch jeder Request einen eigenen Rendering-Kontext (eine eigene Instanz der Vue App) bekommt
