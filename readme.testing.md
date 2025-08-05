# Testing

## Unit-Tests

Das Projekt verwendet Vitest als Test-Runner und Assertion-Bibliothek. Die Tests sind im `/tests/unit/` Verzeichnis organisiert.

### Tests ausführen

```bash
# Alle Tests einmalig ausführen
npm run test

# Tests im Watch-Modus
npm run test:watch
```

### Namenskonventionen

- **Test-Dateien**: `*.test.ts`
- **Describe-Blöcke**: Funktionsnamen mit Klammern, z.B. `functionName()`
- **Test-Cases**: Beschreibende Sätze in Englisch

### Vitest-Konfiguration

Die Vitest-Konfiguration nutzt @nuxt/test-utils für die Integration mit Nuxt:

```typescript
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // Konfiguration
})
```

### Test-Utilities

Das Projekt stellt verschiedene Test-Utilities bereit:

- **Mock-Funktionen**: Für API-Calls und externe Dependencies
- **Test-Konstanten**: Geteilte Konstanten für konsistente Tests
- **Helper-Funktionen**: Wiederverwendbare Test-Logik
