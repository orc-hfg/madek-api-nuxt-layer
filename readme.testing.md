# Testing

## Überblick

Dieses Projekt verwendet eine mehrschichtige Quality-Assurance-Strategie:

**Statische Analyse (Compile-Zeit):**
- TypeScript, ESLint, Knip

**Dynamische Tests (Runtime):**
- Unit-Tests (Business Logic)
- E2E-Tests (Frontend-Integration)

**Test-Infrastruktur:**
- Mock-API-System für E2E-Tests

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

### Tests ausführen

```bash
# Alle Unit-Tests einmalig ausführen
npm run test

# Tests im Watch-Modus
npm run test:watch
```

### Wann sollte ich Tests schreiben?

**JA - Schreibe Tests für:**

1. **Pure Functions mit komplexer Logik**
   ```typescript
   // ✅ Test schreiben
   export function mergeRoles(mdRoles, roles) {
     // Komplexe Merge-Logik mit Filtering
   }
   ```

2. **Daten-Transformationen mit mehreren Edge-Cases**
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
   async function getCollectionMetaDatum(event, id, key) {
     const data = await fetchFromApi();
     return normalizeData(data); // normalizData wird separat getestet
   }
   ```

2. **API-Endpoints** (zu komplex)
   ```typescript
   // ❌ KEIN Test nötig - wird durch E2E-Tests abgedeckt
   export default defineEventHandler(async (event) => {
     // Route-Handling, Mock-Switching, etc.
   });
   ```

3. **Triviale Getter/Setter**
   ```typescript
   // ❌ KEIN Test nötig
   export function getId(item) {
     return item.id;
   }
   ```

### Test-Coverage

**Wichtigste Test-Bereiche:**
- `server/madek-api-services/collection-meta-datum/normalization.test.ts`
- `server/utils/error-handling.test.ts`
- `server/utils/text.test.ts`
- `server/utils/__madek-api-tests__/`
- `app/utils/localization.test.ts`
- `app/services/sets.test.ts`

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

## E2E-Tests & Mock-API-System

**Kontext:** E2E-Tests laufen in der **Haupt-Applikation**, nicht in diesem Layer.

### E2E-Tests (Haupt-App)

Die Haupt-Applikation nutzt **Playwright** für Frontend-Integration-Tests:

**Was getestet wird:**
- ✅ Frontend-Logik, UI-Komponenten, User-Flows
- ✅ App-Services und Store-Layer (Pinia)
- ✅ Repository-Pattern und Client-Side-Logik

**Was NICHT getestet wird:**
- ❌ Service-Layer-Normalisierung (wird durch Unit-Tests in diesem Layer abgedeckt)
- ❌ Echte API-Integration (Mock-Daten werden verwendet)

> **Details:** Siehe Testing-Dokumentation in der Haupt-Applikation

### Mock-API-System

Dieser Layer stellt ein **Mock-API-System** für E2E-Tests bereit:

**Wichtig:** Mock-Daten sind **Development Fixtures** (bereits normalisiert), keine klassischen Mocks.

```typescript
// Mock-Daten in server/madek-api-mock/data.ts
export const mockData = {
  getCollectionMetaDatum: () => ({
    string: 'Title',
    roles: [{ person_id: '...', role_id: '...', labels: {...} }]  // Bereits normalisiert!
  })
};
```

**Konsequenz:** Service-Layer wird im Mock-Modus übersprungen!

```
E2E-Test (Haupt-App):
  ↓
Mock-API-Daten (bereits normalisiert)
  ↓
App-Services & UI

Service-Layer wird ÜBERSPRUNGEN!
  ↑
Wird durch Unit-Tests in diesem Layer abgedeckt ✅
```

**Trade-off:**
- ✅ Schnelle E2E-Tests ohne Backend
- ❌ Service-Layer nicht im echten Flow getestet
- ✅ Aber: Unit-Tests decken Service-Layer-Logik vollständig ab

> **Details:** Siehe [readme.development.md](./readme.development.md) → Mock-API-System

## Statische Code-Analyse

Das Projekt verwendet mehrere Tools für statische Code-Analyse als zusätzliche Quality-Assurance-Schicht.

### ESLint - Code-Quality & Architektur

```
Development-Zeit:
  ESLint → IDE zeigt Fehler sofort an
         ↓
Pre-Commit (husky / lint-staged):
  git commit → ESLint läuft automatisch
         ↓
CI/CD (github actions):
  npm run lint → Pipeline bricht bei Fehlern ab
```

### Knip - Dead Code Detection

Knip findet ungenutzten Code und Dependencies:

**Was Knip erkennt:**
- Ungenutzte Dateien und Exporte
- Nicht importierte Funktionen und Komponenten
- Ungenutzte Dependencies in `package.json`
- Ungenutzte TypeScript-Types und Interfaces
- Duplicate Exports

**Integration:**
```bash
npm run check:unused  # Führt Knip aus
npm run check:issues  # Lint + Types + Knip + Tests
```

**Nutzen:**
- Hält Codebase schlank und wartbar
- Verhindert tote Dependencies (Security-Risiko)
- Zeigt vergessene Refactorings
- Reduziert Bundle-Size

### Zusammenspiel aller Quality-Gates

```
Statische Analyse:
  1. TypeScript     → Typ-Sicherheit (70% API-Breaking-Changes)
  2. ESLint         → Code-Quality + Architektur-Patterns
  3. Knip           → Dead Code Detection
         ↓
Dynamische Tests:
  4. Unit-Tests     → Service-Layer-Logik
  5. E2E-Tests      → Frontend-Flows und Integration
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

### Explicit Resource Management (`using` Keyword)

Die Tests verwenden das **`using` Keyword** für automatisches Resource Management (Node 24+, TypeScript 5.2+):

```typescript
it('should do something', async () => {
  using apiTestContext = setupApiTestContext();
  
  // Test-Code hier
  // apiTestContext wird AUTOMATISCH aufgeräumt, auch bei Fehlern!
});
```

**Was macht `using`?**
- Ruft automatisch `[Symbol.dispose]()` am Ende des Scopes auf
- Funktioniert auch bei Exceptions (wie `try...finally`)
- Macht manuelle `afterEach` Hooks überflüssig

**Vorher (mit `beforeEach`/`afterEach`):**
```typescript
describe('myTest()', () => {
  let apiTestContext;

  beforeEach(() => {
    apiTestContext = setupApiTestContext();
  });

  afterEach(() => {
    apiTestContext.dispose(); // Manuelles Cleanup
  });

  it('should do something', async () => {
    // Test-Code
  });
});
```

**Nachher (mit `using`):**
```typescript
describe('myTest()', () => {
  it('should do something', async () => {
    using apiTestContext = setupApiTestContext(); // Automatisches Cleanup!
    
    // Test-Code
  });
});
```

**Vorteile:**
- ✅ Kein vergessenes Cleanup mehr
- ✅ Weniger Boilerplate-Code
- ✅ Cleanup funktioniert auch bei Assertion-Fehlern
- ✅ Jeder Test hat isolierten Context

**Wichtig:** Erfordert Node.js 24+ (V8 13.6 mit Explicit Resource Management Support).

> **Mehr Details:**
> - [Better Test Setup with Disposable Objects](https://www.epicweb.dev/better-test-setup-with-disposable-objects) - Praktischer Artikel über `using` in Tests
> - [JavaScript's New Superpower: Explicit Resource Management](https://v8.dev/features/explicit-resource-management) - Technische Details zum Feature

### Test-Coverage

**Wichtigste Test-Bereiche:**
- `server/madek-api-services/collection-meta-datum/normalization.test.ts`
- `server/utils/error-handling.test.ts`
- `server/utils/text.test.ts`
- `server/utils/__madek-api-tests__/`
- `app/utils/localization.test.ts`
- `app/services/sets.test.ts`

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
