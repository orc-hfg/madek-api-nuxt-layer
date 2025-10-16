# Testing

## Test-Strategie

Dieses Nuxt-Layer verfolgt eine klare Test-Strategie, die zwischen **Unit-Tests** (in diesem Layer) und **End-to-End-Tests** (in der Haupt-Applikation) unterscheidet.

### Unit-Tests (Nuxt-Layer)

**Fokus: Business Logic & Pure Functions**

Unit-Tests in diesem Layer konzentrieren sich ausschließlich auf **testbare Business Logic**:

- ✅ **Pure Functions** - Funktionen ohne Side-Effects (z.B. Normalisierung, Formatierung)
- ✅ **Utilities** - Wiederverwendbare Helper-Funktionen (z.B. Text-Normalisierung, Error-Handling)
- ✅ **Daten-Transformationen** - Filtering, Mapping, Validierung
- ✅ **API-Client-Logik** - Cache-Keys, Request-Config (ohne echte API-Calls)

**Bewusst NICHT getestet:**

- ❌ **Service-Layer** - Services sind reine Orchestration (API-Calls + Repository-Calls)
- ❌ **API-Endpoints** - Benötigen komplexe H3Event-Mocks und echte API-Integration
- ❌ **Repository-Pattern** - Wird durch E2E-Tests in der Haupt-App abgedeckt

**Begründung:** Service-Layer und API-Endpoints enthalten keine eigenständige Business Logic. Sie orchestrieren nur bereits getestete Utilities. Das Testen würde aufwendige Mocks erfordern (>150 Zeilen Setup pro Test) mit fraglichem ROI.

### End-to-End-Tests (Haupt-Applikation)

**Fokus: Integration & User-Flows**

E2E-Tests in der Haupt-Applikation (mit Playwright) testen die **vollständige Integration**:

- ✅ Service-Layer-Integration
- ✅ API-Kommunikation (mit Mock-API-System)
- ✅ Repository-Pattern
- ✅ Komplette User-Flows
- ✅ UI-Komponenten mit realistischen Daten

**Zusammenspiel:**

```
┌─────────────────────────────────────────┐
│  E2E-Tests (Haupt-App, Playwright)      │  ← Integration & User-Flows
│  - Testet Service-Orchestration         │
│  - Mock-API-Calls (Mock-System)         │
│  - UI mit realistischen Mock-Daten      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Service-Layer (NICHT unit-tested)      │  ← Nur Orchestration
│  - app/services/*.ts                    │
│  - server/madek-api-services/*.ts       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│  Unit-Tests (Nuxt-Layer, Vitest)        │  ← Business Logic
│  - Pure Functions (Normalisierung)      │
│  - Utilities (Text, Error-Handling)     │
│  - API-Client-Logik                     │
└─────────────────────────────────────────┘
```

## Unit-Tests

Das Projekt verwendet Vitest als Test-Runner und Assertion-Bibliothek.

### Tests ausführen

```bash
# Alle Tests einmalig ausführen
npm run test

# Tests im Watch-Modus
npm run test:watch
```

### Test-Coverage

Aktuell: **130+ Unit-Tests**

**Wichtigste Test-Bereiche:**
- `server/madek-api-services/collection-meta-datum/normalization.test.ts` - 26 Tests
- `server/utils/error-handling.test.ts` - 20 Tests
- `server/utils/text.test.ts` - 17 Tests
- `server/utils/__madek-api-tests__/` - 34 Tests (API-Client)
- `app/utils/localization.test.ts` - 13 Tests
- `app/services/sets.test.ts` - 6 Tests

### Namenskonventionen

- **Test-Dateien**: `*.test.ts` (neben der getesteten Datei)
- **Describe-Blöcke**: Funktionsnamen mit Klammern, z.B. `functionName()`
- **Test-Cases**: Beschreibende Sätze in Englisch, beginnend mit "should"

**Beispiel:**

```typescript
describe('normalizePeople()', () => {
  it('should return empty array when people is undefined', () => {
    expect(normalizePeople(undefined)).toStrictEqual([]);
  });

  it('should filter out null entries', () => {
    const people = [
      { first_name: 'John', last_name: 'Doe' },
      null,
    ];
    expect(normalizePeople(people)).toHaveLength(1);
  });
});
```

### Wann sollte ich Tests schreiben?

**JA - Schreibe Tests für:**

1. **Pure Functions** mit komplexer Logik
   ```typescript
   // ✅ Test schreiben
   export function mergeRoles(mdRoles, roles) {
     // Komplexe Merge-Logik mit Filtering
   }
   ```

2. **Daten-Transformationen** mit mehreren Edge-Cases
   ```typescript
   // ✅ Test schreiben
   export function normalizeTextContent(text, shouldTrim) {
     // Null-Handling, Whitespace, Line-Endings
   }
   ```

3. **Validierungs-Logik**
   ```typescript
   // ✅ Test schreiben
   export function shouldReturnEmptyArrayOn404(metaKeyId) {
     return META_KEYS_RETURN_EMPTY_ARRAY_ON_404.has(metaKeyId);
   }
   ```

**NEIN - Keine Tests für:**

1. **Service-Methoden** (nur Orchestration)
   ```typescript
   // ❌ KEIN Test nötig
   async function getTitle(setId, locale) {
     const metaKeyId = META_KEYS.title[locale];
     return repository.getCollectionMetaDatum(setId, metaKeyId);
   }
   ```

2. **API-Endpoints** (nur Event-Handling)
   ```typescript
   // ❌ KEIN Test nötig - E2E-Tests decken ab
   export default defineEventHandler(async (event) => {
     const params = await validateRouteParameters(event, schema);
     return getCollectionMetaDatum(event, params.id);
   });
   ```

3. **Triviale Helper ohne Logik**
   ```typescript
   // ❌ KEIN Test nötig
   export function getSetService() {
     return createSetService();
   }
   ```

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

## Best Practices

### 1. Tests nah am Code

Test-Dateien liegen direkt neben dem getesteten Code:
```
server/utils/
├── text.ts
└── text.test.ts
```

**Ausnahme:** API-Client-Tests sind gruppiert in `server/utils/__madek-api-tests__/`, da sie mehrere zusammenhängende Aspekte des API-Clients testen (Cache-Keys, Request-Config, Data-Fetching).

### 2. Aussagekräftige Test-Namen

```typescript
// ✅ Gut - beschreibt erwartetes Verhalten
it('should filter out people where both name fields are empty', () => {});

// ❌ Schlecht - zu generisch
it('should work correctly', () => {});
```

### 3. Arrange-Act-Assert Pattern

```typescript
it('should normalize whitespace in text content', () => {
  // Arrange
  const input = '  Hello  World  ';
  
  // Act
  const result = normalizeTextContent(input, true);
  
  // Assert
  expect(result).toBe('Hello World');
});
```

### 4. Teste Edge-Cases

```typescript
describe('normalizePeople()', () => {
  it('should handle undefined input', () => {});
  it('should handle empty array', () => {});
  it('should handle null entries', () => {});
  it('should handle empty name fields', () => {});
  it('should handle valid entries', () => {});
});
```

### 5. Keine unnötigen Assertions

```typescript
// ✅ Gut - eine klare Assertion
expect(result).toHaveLength(1);
expect(result[0]!.role_id).toBe('role2');

// ❌ Vermeiden - TypeScript non-null assertion nur wenn nötig
```
