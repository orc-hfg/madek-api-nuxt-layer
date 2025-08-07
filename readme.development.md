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
