# TypeScript-Richtlinien

## Best Practices für TypeScript im Layer

### Nuxt 4 TypeScript-Konfiguration

Das Projekt nutzt Nuxt 4's TypeScript-Konfiguration-Splitting mit separaten tsconfig-Dateien für verschiedene Kontexte:

```json
{
	// https://nuxt.com/docs/guide/concepts/typescript
	"references": [
		{ "path": "./.nuxt/tsconfig.app.json" },
		{ "path": "./.nuxt/tsconfig.server.json" },
		{ "path": "./.nuxt/tsconfig.shared.json" },
		{ "path": "./.nuxt/tsconfig.node.json" }
	],
	"files": []
}
```

**Kontext-spezifische Konfigurationen:**

#### **shared/** (`tsconfig.shared.json`)
- **Framework-agnostic**: Kein Zugriff auf Nuxt-spezifische APIs
- **`"types": []`**: Keine globalen Auto-Imports verfügbar
- **Verfügbare Aliases**: `#shared/*`, aber **nicht** `#app` (führt zu TypeScript-Fehlern)
- **Zweck**: Wiederverwendbare Utilities, die in allen Kontexten funktionieren

#### **server/** (`tsconfig.server.json`)
- **Server-Kontext**: H3Event-Zugriff, `useRuntimeConfig(event)`
- **Auto-Imports**: `#imports` → `./types/nitro-imports` (Server-spezifische APIs)
- **Shared-Zugriff**: `#shared/*` verfügbar für geteilte Utilities
- **APIs**: Nitro, H3, Webworker (aber kein volles DOM)
- **Include**: `../server/**/*`, `../shared/**/*.d.ts`

#### **app/** (`tsconfig.app.json`)
- **Client-Kontext**: Vue-Composables, `useRuntimeConfig()`
- **Auto-Imports**: `#imports` → `./imports` (Client-spezifische APIs)
- **Nuxt-App-APIs**: `#app/*` verfügbar für App-spezifische Funktionen
- **Shared-Zugriff**: `#shared/*` verfügbar für geteilte Utilities
- **Browser-APIs**: Vollzugriff auf DOM, Webworker, Client-side Navigation
- **Include**: `../app/**/*`, `../shared/**/*.d.ts` | **Exclude**: `../server`

#### **node/** (`tsconfig.node.json`)
- **Build-Zeit**: Nuxt-Konfiguration, Module und Build-Tools
- **Umfasst**: `nuxt.config.*`, Module-Definitionen, Layer-Konfigurationen
- **Ausgeschlossen**: Runtime-Code (`app/`, `server/`, `modules/*/runtime/`)

### Context-spezifische Logger-Factories

Aufgrund der TypeScript-Konfiguration-Splitting werden context-spezifische Logger-Factories verwendet:

```typescript
// shared/utils/logger.ts - Framework-agnostic
export function createLoggerWithConfig(isDebugEnabled: boolean): Logger

// server/utils/logger.ts - Server-spezifisch
export function createLogger(event?: H3Event): Logger

// app/utils/logger.ts - App-spezifisch
export function createLogger(): Logger
```

### Import-Konventionen

- **Type-Imports**: Immer explizit mit `import type`
- **Framework-agnostic Code**: Nur in `shared/` Verzeichnis
- **Context-spezifische APIs**: In entsprechenden Verzeichnissen (`server/`, `app/`)

### Kommentar-Sprache

Alle Code-Kommentare werden ausschließlich in **Englisch** verfasst, unabhängig von der Sprache der Dokumentation.
