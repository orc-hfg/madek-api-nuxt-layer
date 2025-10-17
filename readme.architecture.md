# Architektur

## Überblick

Die Codebasis folgt einer mehrschichtigen Architektur mit klarer Trennung der Verantwortlichkeiten:

```
UI Layer (Components, Pages, Layouts)
       ↓
Store Layer (Pinia Stores)
       ↓
App Service Layer (app/services/)
       ↓
Repository Layer (app/repositories/)
       ↓
API Endpoint Layer (server/api/)
       ↓
API Service Layer (server/madek-api-services/)
       ↓
External APIs (Madek)
```

## Service Layer Architektur

Die Codebasis folgt einer klaren Trennung zwischen API Service Layer und App Service Layer, um Verantwortlichkeiten sauber zu separieren.

### API Service Layer (server/madek-api-services/)

**Verantwortung:** Datenbeschaffung, Normalisierung und Datenintegrität

- Daten von externen APIs abrufen
- Daten normalisieren (null-Werte konvertieren, Whitespace trimmen, Zeilenumbrüche vereinheitlichen)
- **Datenintegrität sicherstellen:**
  - Null-Safety-Checks zur Vermeidung von Runtime-Errors
  - Referenzielle Integrität (z.B. Roles ohne passende Definitionen entfernen)
  - Datenstruktur-Validierung
  - **Filterung ungültiger Daten:** Beispiele: Personen ohne Namen, Keywords ohne Terms entfernen

### App Service Layer (app/services/)

**Verantwortung:** Business-Logic und Domain-spezifische Transformationen

- Normalisierte Daten für Anwendungsbedürfnisse transformieren
- Mehrere Datenquellen koordinieren
- Locale-spezifische Logik anwenden
- **Roles-spezifisches Filtering:**
  - Person-Daten sind nicht in Collection-Meta-Datum-Responses enthalten
  - Müssen separat über AdminPerson API geholt werden (ein Call pro Role)
  - API Service Layer liefert nur Role-Struktur (role_id, person_id, labels)
  - App Service Layer orchestriert: Role-Daten → AdminPerson-Fetch → Filtering

### Die Grenze zwischen den Layern

**API Layer:** Kann ich überhaupt diese Datenstruktur aufbauen? Sind die Daten strukturell valide?

**App Layer:** Welche zusätzlichen Daten brauche ich? Wie transformiere ich für den Use Case?

**Wichtig:** Filterung findet primär im API Layer statt (People, Keywords).
Roles-Filtering muss im App Layer erfolgen, weil:
- Person-Daten nicht im Meta-Datum-Response enthalten sind
- Separate API-Calls erforderlich sind (Orchestrierung im App Layer)
- Business-Logic (Name-Validität, Umgang mit gelöschten Personen) dort besser aufgehoben ist

Diese Trennung sorgt für klare Verantwortlichkeiten, bessere Testbarkeit und minimiert redundanten Filter-Code.

## Store Layer (Pinia)

**Verantwortung:** State Management und Koordination zwischen UI und Services

Stores fungieren als zentrale State-Management-Schicht zwischen UI-Components und Services:

- **State verwalten:** Reaktive Daten für die UI bereitstellen
- **Services koordinieren:** Mehrere Service-Aufrufe orchestrieren
- **Business-Logic:** UI-spezifische Transformationen und Berechnungen

**Faustregel:** Components rufen Stores auf, Stores rufen Services auf, Services rufen Repositories auf.

## API Endpoint Layer (server/api/)

**Verantwortung:** HTTP-Schnittstelle und Mock-Verwaltung

Die API Endpoints sind die Brücke zwischen Client (Repositories) und Server (API Services):

- **Route-Validierung:** Parameter mit Zod-Schemas validieren
- **Mock-Handling:** Entscheidung zwischen Mock-Daten und echten API-Aufrufen via `getApiMockOrExecute()`
- **Error-Transformation:** Server-Fehler für Client aufbereiten

```typescript
// server/api/admin/people/[id]/index.get.ts
export default defineEventHandler(async (event: H3Event) => {
  const parameters = await validateRouteParameters(event, routeParameterSchemas.personId);

  return getApiMockOrExecute(
    event,
    'API: admin-people',
    'Returning mock: admin-people',
    { id: parameters.id },
    () => mockData.getAdminPerson(parameters.id),        // Mock
    async () => getAdminPerson(event, parameters.id),    // Echt
  );
});
```

**Wichtig:** Repositories wissen nicht, ob sie Mock- oder echte Daten erhalten. Die Entscheidung wird zentral in den Endpoints getroffen.

**Mock-API-Verhalten:** Im Mock-Modus wird der API Service Layer übersprungen. Mock-Daten müssen daher bereits normalisiert sein. Details siehe [readme.testing.md](./readme.testing.md) → Mock-API-System & Test-Coverage.

## Repository Pattern

Repositories abstrahieren den Datenzugriff und bieten:

- **Konsistente API** für Datenabfragen
- **Caching-Logik** zentral verwalten
- **Testbarkeit** durch einfache Mocks

## Request Flow & URL-Transformation

### URL-Transformation durch die Schichten

Ein Request durchläuft mehrere Transformationen auf dem Weg von Client zur externen API:

**1. Client-Side Repository Call**
```typescript
// app/repositories/sets.ts
$madekApi('/collection/123/meta-datum/madek_core:title')
```

**2. Madek API Plugin (app/plugins/madek-api.ts)**
```typescript
baseURL: `${config.app.baseURL}/api`
// Ergebnis: http://localhost:3000/api/collection/123/meta-datum/madek_core:title
```

**3. Nitro Server API Endpoint**
```typescript
// server/api/collection/[collection_id]/meta-datum/[meta_key_id]/index.get.ts
// Empfängt Request und validiert Parameter
```

**4. Madek API Client (server/utils/madek-api.ts)**
```typescript
baseURL: 'https://dev.madek.hfg-karlsruhe.de/api-v2'
// Ergebnis: https://dev.madek.hfg-karlsruhe.de/api-v2/collection/123/meta-datum/madek_core:title
```

**5. Externe Madek API**
- Empfängt Request mit Authentifizierung
- Sendet JSON Response zurück

### Daten-Transformation durch die Schichten

```
Externe Madek API
  ↓ Raw JSON (alle Felder, nicht normalisiert)
API Service Layer
  ↓ Normalisierung, Filterung, Fallback-Handling
  ↓ TypeScript-Typen
Repository Layer
  ↓ Type-safe API Response
App Service Layer
  ↓ Business-Logic
  ↓ Domain-Typen
Store Layer
  ↓ UI-freundliche Struktur (reaktiv)
UI Components
  ↓ Direkter Zugriff auf reaktive Daten
```

## Caching

Das Projekt implementiert eine zweistufige Caching-Strategie abhängig von der Datensensitivität.

### Serverseitiges Caching (Backend for Frontend)

**Anwendungsfall:** Nutzerneutrale Daten (öffentliche Inhalte)

- Daten werden auf dem Nitro-Server gecached (je Endpunkt konfiguriert)
- Shared Cache zwischen allen Nutzern
- Keine nutzerspezifischen Informationen
- Kein besonderer Cache-Key nötig

**Wichtig:** Nur nutzerneutrale Daten auf Server cachen, um Cross-Request State Pollution zu vermeiden.

### Clientseitiges Caching (useCachedAsyncData)

**Anwendungsfall:** Nutzerspezifische Daten

- Daten werden im Browser des Nutzers gecached
- Cache bleibt nach Page-Reload erhalten (Session-basiert)
- Jeder Request bekommt automatisch eigenen Rendering-Kontext
- Keine Cross-Request State Pollution möglich

**Debugging:**
- Nuxt Dev Tools → "Keyed State from useAsyncData"
- Cache wird bei Session-Ende gelöscht

### Caching-Entscheidungslogik

**Regel:**
- ✅ **Cache:** Öffentliche Daten in Production
- ❌ **Kein Cache:** Authentifizierte Daten oder Development-Modus

## Logging Architektur

Das Projekt verwendet kontextspezifische Logger-Factories mit einheitlicher Interface.

### Logger-Erstellung je Kontext

**Server-Side (Request Handler):**
```typescript
export default defineEventHandler(async (event: H3Event) => {
  const logger = createServerLogger(event, 'ServiceName');
  logger.info('Processing request');
});
```

**Server-Side (Startup/Plugins):**
```typescript
export default defineNitroPlugin(() => {
  const logger = createServerStartupLogger('PluginName');
  logger.info('Server plugin initialized');
});
```

**App-Side (Client):**
```typescript
const logger = createAppLogger('ServiceName');
logger.info('Client action');
```

### Logging-Konfiguration

Logging wird zentral über Runtime Config gesteuert:

```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    enableLogging: true  // false für Production
  }
}
```

## Best Practices

### Architektur-Prinzipien

- ✅ **Separation of Concerns:** Klare Trennung zwischen Layern
- ✅ **Single Responsibility:** Jeder Layer hat eine klar definierte Aufgabe
- ✅ **Data Integrity:** API Layer garantiert strukturell valide Daten
- ✅ **Type Safety:** TypeScript Type Guards und Interface-Garantien
- ✅ **Graceful Degradation:** Fehlertolerante Fallback-Strategien

### Checklist für neue Features

- ✅ API Endpoints validieren Parameter und handhaben Mock-Logik
- ✅ API Service Layer normalisiert und filtert technisch ungültige Daten
- ✅ App Service Layer wendet Business-Logic an
- ✅ Repositories abstrahieren Datenzugriff
- ✅ Type Guards für Null-Filtering verwenden
- ✅ Kontextspezifische Logger verwenden
- ✅ Error Handling mit Fallback-Strategien
- ✅ Caching-Strategie entsprechend Datensensitivität wählen (Server vs. Client)
