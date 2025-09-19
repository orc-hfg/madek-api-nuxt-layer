# Entwicklung

## Lokale Entwicklung des madek-api-nuxt-layer und Integration in ein Hauptprojekt

Damit neue oder geänderte Funktionen dieses Layers lokal in einer Nuxt-App (z.B. dem „Uploader") getestet werden können, ohne für jede Änderung ein neues Release zu erstellen, kann `npm link` (https://docs.npmjs.com/cli/v9/commands/npm-link) verwendet werden.

### Voraussetzungen

- dieses Repository ist lokal geklont
- ein Hauptprojekt (z.B. „Uploader"), in dem der Layer verwendet wird, ist ebenfalls lokal verfügbar

### Schnellstartmethode (Empfohlen)

**Für parallele Entwicklung mit dem Hauptprojekt:**

1. **Im Layer-Repository** (madek-api-nuxt-layer):
   ```bash
   npm run link:dev
   ```
   Das verlinkt den Layer global und startet den Development-Server (Port 3001).

2. **Im Hauptprojekt** (z.B. Uploader):
   ```bash
   npm run link:dev
   ```
   Das verlinkt das Hauptprojekt mit dem Layer und startet ebenfalls den Development-Server.

**Wichtig:** Beide Development-Server müssen parallel laufen, damit Live-Updates funktionieren.

### Manuelle Methode (Alternative)

Falls Sie die einzelnen Schritte manuell ausführen möchten:

#### 1. Layer-Projekt global verlinken

In den Ordner des Nuxt-Layers wechseln und das Package global per Symlink verlinken:

```bash
cd /pfad/zu/madek-api-nuxt-layer
npm link && npm run dev
```

#### 2. Link im Hauptprojekt aktivieren

In das Hauptprojekt wechseln:

```bash
cd /pfad/zum/hauptprojekt
npm run madek-api-nuxt-layer:link && npm run dev
```

Jetzt wird der lokal verlinkte Nuxt-Layer (aus Schritt 1) anstelle der in der package.json angegebenen (veröffentlichten) Version verwendet.

**Wichtiger Hinweis:** Nuxt Plugins dürfen nicht doppelt installiert werden. Beispielsweise darf Pinia nur im Layer-Projekt installiert sein.

#### 3. Linking wieder auflösen (optional)

Wenn wieder die offizielle (z.B. auf npm oder Git referenzierte) Version verwenden werden soll:

- `npm install` im Hauptprojekt ausführen, dabei wird der Link automatisch aufgelöst und die Version aus der package.json verwendet

## API-Typen-Generierung

Die API-Typen in `generated/api` werden aus der OpenAPI-Spezifikation in `resources/openapi.json` generiert. Diese Dateien werden im Repository versioniert, um Konsistenz im Team zu gewährleisten.

### API-Typen aktualisieren

Wenn sich die OpenAPI-Spezifikation ändert, können die Typen neu generiert werden: `npm run generate:api`

## Import-Pfad Guidelines

Bei der Entwicklung von Nuxt-Layers sollten **immer relative Imports** verwendet werden, nicht die in Nuxt-Projekten sonst üblichen Alias-Imports mit Tilde (`~`) oder At-Zeichen (`@`).

**Richtig:**
```typescript
// Immer relative Pfade verwenden
import { someFunction } from '../utils/helpers';
import { SomeType } from '../../types/models';
```

**Vermeiden:**
```typescript
// In Nuxt-Layers NICHT verwenden
import { someFunction } from '~/utils/helpers';
import { SomeType } from '@/types/models';
```

Diese Einschränkung gilt speziell für Nuxt-Layers, da Alias-Pfade möglicherweise nicht korrekt zwischen dem Layer und dem Hauptprojekt aufgelöst werden. Relative Pfade gewährleisten die korrekte Auflösung der Imports unabhängig vom Kontext.

## Logging Guidelines

Dieses Layer verwendet ein konsistentes Logger-System mit verschiedenen Kontexten für App-, Server- und Test-Umgebungen.

### App Logger (Client-Side)
```typescript
// Logger erstellen mit Source im Konstruktor
const appLogger = createAppLogger('Plugin: madek-api');

// Verwenden ohne Source-Parameter
appLogger.info('User signed in successfully');
appLogger.error('Sign-in failed', error);
appLogger.debug('Debug information', debugData);
```

### Server Logger (Server-Side)

**Server Request Logger** - für Request Handler (mit H3Event):
```typescript
// In API routes (server/api/*.ts) oder anderen Request Handlers
export default defineEventHandler(async (event) => {
	const serverLogger = createServerLogger(event, 'API: /auth/sign-in');
	serverLogger.error('Authentication failed', error);
	serverLogger.info('Request processed successfully');
});
```

**Server Startup Logger** - für Plugins und Initialization:
```typescript
// In Server Plugins (server/plugins/*.ts)
const serverStartupLogger = createServerStartupLogger('Plugin: authentication-mock');
serverStartupLogger.info('Authentication mock is active.');
```

### Wichtige Unterschiede

**Server Request vs. Startup Logger:**
- **Request Logger**: Benötigt H3Event, wird in API routes und Request Handlers verwendet
- **Startup Logger**: Kein H3Event verfügbar, wird in Server Plugins während der Initialisierung verwendet

**Warum zwei Server Logger?**
Server Plugins laufen während des Server-Starts, nicht während individueller Requests. Sie haben keinen Zugriff auf H3Event und müssen `useRuntimeConfig()` ohne Event-Parameter aufrufen.

**Logging aktivieren:**
```env
# In .env oder nuxt.config.ts
NUXT_PUBLIC_ENABLE_LOGGING=true
```

## Mock API System

Das Layer bietet ein vollständig integriertes Mock-API-System für Entwicklung und Tests. Mock-Daten ermöglichen die Entwicklung ohne Abhängigkeit von der echten Madek-API.

### Mock-API aktivieren

Mock-APIs werden über die Runtime-Konfiguration aktiviert:

```env
# In .env Datei
NUXT_PUBLIC_ENABLE_API_MOCK=true
```

Oder direkt in der `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      enableApiMock: true
    }
  }
})
```

### Mock-Handler-Pattern

Das Layer verwendet zwei zentrale Mock-Handler für einheitliche Mock-Behandlung:

#### Einfache API-Endpoints (`getApiMockOrExecute`)

Für Standard-Endpoints ohne komplexe Fallback-Logik:

```typescript
// server/api/collections.get.ts
export default defineEventHandler(async (event: H3Event) => {
  const query = await validateQueryParameters(event, routeQuerySchemas.collections);

  return getApiMockOrExecute(
    event,
    'API: collections',                           // Logger-Kontext
    'Returning mock: collections',                // Log-Nachricht
    { responsible_user_id: query.responsible_user_id }, // Log-Daten
    () => mockData.getCollections(query),         // Mock-Funktion
    async () => getCollections(event, query),     // Echte API-Funktion
  );
});
```

#### Komplexe API-Endpoints (`getApiMockOrUndefined`)

Für Endpoints mit Fallback-Logik oder komplexer Verarbeitung:

```typescript
// server/api/collection/[id]/meta-datum/[key]/index.get.ts
export default defineEventHandler(async (event: H3Event) => {
  const parameters = await validateRouteParameters(event, routeParameterSchemas.collectionMetaDatum);

  // Versuche zuerst Mock-Daten zu bekommen
  const apiMockResult = await getApiMockOrUndefined(
    event,
    'API: collection meta-datum',
    'Returning mock: collection meta-datum',
    { collectionId: parameters.collection_id },
    () => mockData.getCollectionMetaDatum(parameters.collection_id, parameters.meta_key_id),
  );

  if (apiMockResult !== undefined) {
    return apiMockResult;
  }

  // Komplexe Fallback-Logik für echte API
  try {
    return await getCollectionMetaDatum(event, parameters.collection_id, parameters.meta_key_id);
  } catch (error) {
    // Fallback-Behandlung...
  }
});
```

**Wichtig:** Bei `getApiMockOrUndefined` immer `!== undefined` prüfen, nicht nur Truthiness, um auch falsy Mock-Daten korrekt zu behandeln.

### Mock-Daten-Struktur

Alle Mock-Daten sind zentral in `server/madek-api-mock/data.ts` definiert:

```typescript
export const mockData = {
  getCollections: (query: CollectionsQuery): Collections => [
    { id: 'collection-id-1' },
    { id: 'collection-id-2' },
  ],

  getCollectionMetaDatum: (collectionId: string, metaKeyId: string): CollectionMetaDatum => ({
    string: `Test collectionId ${collectionId} / metaKeyId ${metaKeyId} Content`,
  }),

  getAuthInfo: (): AuthInfo => ({
    id: 'user-id-1',
    login: 'test-user',
    first_name: 'Test',
    last_name: 'User',
  }),

  // Weitere Mock-Funktionen...
};
```

### Mock-Daten erweitern

Neue Mock-Daten können einfach hinzugefügt werden:

1. **Mock-Funktion in `data.ts` hinzufügen:**
   ```typescript
   getMyNewEndpoint: (parameters: MyParameters): MyResponse => ({
     // Mock-Daten-Struktur
   }),
   ```

2. **Endpoint implementieren:**
   ```typescript
   export default defineEventHandler(async (event: H3Event) => {
     return getApiMockOrExecute(
       event,
       'API: my-endpoint',
       'Returning mock: my-endpoint',
       { param: 'value' },
       () => mockData.getMyNewEndpoint(parameters),
       async () => getRealData(event, parameters),
     );
   });
   ```

### Debugging Mock-APIs

Bei aktiviertem Logging werden Mock-Aufrufe automatisch geloggt:

```
[INFO] API: collections - Returning mock: collections { responsible_user_id: 'user-123' }
```

Mock-Status wird auch in den Debug-Plugins angezeigt:

```
=== LAYER FEATURES ===
Logging: enabled
Response delay: disabled
Server-side caching: disabled
API mock: enabled
