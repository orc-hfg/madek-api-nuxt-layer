# Entwicklung

## Lokale Entwicklung des madek-api-nuxt-layer und Integration in ein Hauptprojekt

Damit neue oder geänderte Funktionen dieses Layers lokal in einer Nuxt-App (z.B. dem „Uploader") getestet werden können, ohne für jede Änderung ein neues Release zu erstellen, kann `npm link` (https://docs.npmjs.com/cli/v9/commands/npm-link) verwendet werden.

### Voraussetzungen

- dieses Repository ist lokal geklont
- ein Hauptprojekt (z.B. „Uploader"), in dem der Layer verwendet wird, ist ebenfalls lokal verfügbar

### 1. Dieses Layer-Projekt global verlinken

- in den Ordner dieses Layer-Projekts wechseln
  `cd /pfad/zu/madek-api-nuxt-layer`

- Link-Befehl ausführen:
  `npm link`

Damit wird das Paket global per Symlink registriert, so dass es in anderen Projekten per `npm link <package-name>` eingebunden werden kann.

**Hinweis:** in der `package.json` muss der Name korrekt gesetzt sein, z.B. `"name": "@orc-hfg/madek-api-nuxt-layer"`.

### 2. Lokales Linking im Hauptprojekt aktivieren

- in den Ordner des Hauptprojekts (z.B. „Uploader") wechseln:
  `cd /pfad/zum/hauptprojekt`

- Hauptprojekt mit lokal verlinkten Layer verbinden:
  `npm link @orc-hfg/madek-api-nuxt-layer`

Dadurch wird das lokale Layer-Projekt anstelle der in der package.json angegebenen (veröffentlichten) Version genutzt.

**Hinweis:** Im Hauptprojekt gibt es NPM-Skripte, die das Linking/Unlinking automatisieren (`npm run madek-api-nuxt-layer:link` und `npm run madek-api-nuxt-layer:unlink`).

### 3. Lokale Weiterentwicklung

- nun können die Dateien im Layer-Projekt bearbeitet werden (Plugins, Composables usw.)
- damit die Änderungen im Hauptprojekt wirksam werden, muss ggf. der Dev-Server neu gestartet bzw. auf HMR (Hot Module Replacement) gewartet werden
- die Haupt-App bezieht ab jetzt immer die lokalen Layer-Dateien aus dem Dateisystem, solange der Symlink aktiv ist

**Hinweis:** Nuxt Plugins dürfen nicht doppelt installiert werden. Beispielsweise darf Pinia nur im Layer-Projekt installiert sein.

### 4. Linking wieder auflösen (optional)

Wenn wieder die offizielle (z.B. auf npm oder Git referenzierte) Version verwenden werden soll:

- im Hauptprojekt das Skript `npm run madek-api-nuxt-layer:unlink` ausführen
- oder `npm install` im Hauptprojekt ausführen, dabei wird der Link automatisch aufgelöst

## API-Typen-Generierung

Die API-Typen in `generated/api` werden aus der OpenAPI-Spezifikation in `resources/openapi.json` generiert. Diese Dateien werden im Repository versioniert, um Konsistenz im Team zu gewährleisten.

### API-Typen aktualisieren

Wenn sich die OpenAPI-Spezifikation ändert, können die Typen neu generiert werden: `npm run generate:api`

## Logging Guidelines

Dieses Layer verwendet ein konsistentes Logger-System mit verschiedenen Kontexten für App-, Server- und Test-Umgebungen.

### App Logger (Client-Side)
```typescript
// Logger erstellen mit Source im Konstruktor
const appLogger = createAppLogger('Plugin: madek-api');

// Verwenden ohne Source-Parameter
appLogger.info('User logged in successfully');
appLogger.error('Login failed', error);
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

**Debug Logging aktivieren:**
```env
# In .env oder nuxt.config.ts
NUXT_PUBLIC_ENABLE_DEBUG_LOGGING=true
```
