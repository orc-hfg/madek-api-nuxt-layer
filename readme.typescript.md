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

### Branded Types für IDs

Das Projekt verwendet **Branded Types** um verschiedene ID-Typen zur Compile-Time zu unterscheiden und Verwechslungen zu verhindern.

#### Was sind Branded Types?

Branded Types sind nominale Typen in TypeScript, die verhindern, dass unterschiedliche ID-Typen versehentlich vermischt werden:

```typescript
// Definition
type CollectionId = { readonly __brand: 'CollectionId' } & string;
type MediaEntryId = { readonly __brand: 'MediaEntryId' } & string;

// Verwendung
function getCollection(id: CollectionId) { ... }

const collectionId = toCollectionId('abc-123');
const mediaEntryId = toMediaEntryId('xyz-789');

getCollection(collectionId);  // ✓ OK
getCollection(mediaEntryId);  // ✗ TypeScript Error!
```

#### Verfügbare Branded ID Types

- **User & Person**: `UserId`, `PersonId`
- **Content**: `CollectionId`, `MediaEntryId`
- **Metadata**: `MetaKeyId`, `MetaDatumId`, `KeywordId`, `RoleId`
- **Media**: `PreviewId`

#### Helper Functions (Best Practice)

Verwende immer die bereitgestellten Helper Functions statt direkter Type-Assertions:

```typescript
// ✓ Empfohlen
const id = toCollectionId('collection-123');

// ✗ Vermeiden
const id = 'collection-123' as CollectionId;
```

**Vorteile der Helper Functions:**
- Konsistente Syntax im gesamten Projekt
- Einfachere Suche und Refactoring
- Zentrale Stelle für zukünftige Validierung
- Bessere Lesbarkeit

#### Integration mit Zod

Branded Types werden direkt in Zod-Schemas integriert:

```typescript
import { z } from 'zod';

const collectionIdSchema = z.string()
  .trim()
  .min(1)
  .transform(toCollectionId);

// Nach Validierung ist der Wert automatisch CollectionId
const { collection_id } = await validatePathParameters(event, 'collectionId');
// collection_id hat Type: CollectionId
```

#### Verwendung in Services und Mock-Daten

```typescript
// Services: Transformation von Raw Response zu Branded Types
return response.collections.map((item) => ({
  id: toCollectionId(item.id),  // ← String → Branded Type
}));

// Mock-Daten: Verwenden Branded Types für Konsistenz
const mockData = {
  collections: [
    { id: toCollectionId('collection-1') },
    { id: toCollectionId('collection-2') },
  ],
};
```

#### Service Layer Grenze: Raw Response vs. Normalized Types

Das Projekt verwendet einen **Hybrid-Ansatz** für Branded IDs mit klarer Trennung zwischen API-Response und normalisierten Daten:

**Raw Server Response (Madek API):**
```typescript
// OpenAPI-generierte Types verwenden string für IDs
interface MadekCollectionMetaDatumResponse {
  readonly 'meta-data': {
    readonly created_by_id: string;      // ← string (wie von API zurückgegeben)
    readonly collection_id: string;      // ← string
    readonly meta_key_id: string;        // ← string
  };
  readonly 'people'?: (MadekPerson | null)[];
  readonly 'keywords'?: (MadekKeyword | null)[];
}
```

**Normalized Types (Service Layer Output):**
```typescript
// Normalisierte Types verwenden Branded IDs
export interface PersonInfo {
  readonly id: PersonId;                 // ← Branded Type
  readonly first_name: string;
  readonly last_name: string;
}

export interface KeywordInfo {
  readonly id: KeywordId;                // ← Branded Type
  readonly term: string;
}

export interface CollectionMetaDatum {
  readonly string: string;
  readonly people?: PersonInfo[];        // ← Normalisierte Struktur
  readonly keywords?: KeywordInfo[];     // ← Normalisierte Struktur
}
```

**Transformation im Service Layer:**
```typescript
// server/madek-api-services/collection-meta-datum/normalization.ts
export function normalizePeople(
  people: (MadekPerson | null)[] | undefined
): PersonInfo[] {
  if (!people) return [];

  return people
    .filter((person): person is MadekPerson => person !== null)
    .map((person) => ({
      id: toPersonId(person.id),         // ← String → Branded Type
      first_name: normalizeTextContent(person.first_name),
      last_name: normalizeTextContent(person.last_name),
    }))
    .filter(hasAtLeastOneName);
}
```

**Vorteile dieses Ansatzes:**

✅ **OpenAPI-Kompatibilität**: Keine Probleme mit generierten Types
✅ **Klare Service-Grenze**: Transformation an einer zentralen Stelle
✅ **Type Safety für App-Code**: Alle normalisierten Daten sind type-safe
✅ **Pragmatisch**: 80/20 Balance zwischen Safety und Maintenance

**Mock-Daten folgen dem gleichen Prinzip:**
```typescript
// server/madek-api-mock/data.ts
export const mockData = {
  getCollectionMetaDatum: (): CollectionMetaDatum => ({
    string: 'Test Content',
    people: [
      {
        id: toPersonId('person-1'),      // ← Branded Type in Mocks
        first_name: 'John',
        last_name: 'Doe',
      },
    ],
  }),
};
```

#### Tests: Raw Strings statt Branded Types

**In Tests verwenden wir Raw Strings**, da Runtime-Tests Werte prüfen, nicht Compile-Time Types:

```typescript
// ✓ Tests: Raw Strings mit Type Cast
const mediaEntries = [
  { media_entry_id: 'entry-1', cover: false, position: 0 },
  { media_entry_id: 'entry-2', cover: true, position: 1 },
] as CollectionMediaEntryArcs;

const result = findCoverImageMediaEntryId(mediaEntries);
expect(result).toBe('entry-2');  // ← Prüft String-Wert, nicht Type
```

**Warum keine Branded Types in Test-Assertions?**

```typescript
// ✗ Problem: Branded Types bieten in Tests keinen Schutz
expect(result).toBe(toPersonId('person-1'));
// ← Zur Runtime identisch mit: expect(result).toBe('person-1')

// Auch dieser Test würde NICHT fehlschlagen:
expect(result).toBe(toCollectionId('person-1'));  // ← Falscher Type, gleicher String!
```

**Branded Types sind nur Compile-Time Annotations:**
- Zur Runtime sind `toPersonId('test')` und `toCollectionId('test')` identisch
- Tests prüfen Runtime-Verhalten → Branded Types bringen keinen Mehrwert
- Type Cast (`as CollectionMediaEntryArcs`) ist explizit und ehrlich

**Type Safety kommt von:**
- ✅ TypeScript während der Entwicklung (verhindert falsche ID-Typen in Code)
- ✅ Produktion Code (Service Layer macht korrekte Transformation)
- ❌ Nicht von Runtime-Test-Assertions

#### Wichtige Hinweise

- **Zero Runtime Overhead**: Branded Types existieren nur zur Compile-Time
- **Keine Runtime-Checks**: Die Helper Functions führen keine Validierung durch
- **Zod für Validierung**: Nutze Zod-Schemas für Input-Validierung, nicht Branded Types
- **Transformation im Service Layer**: Konvertierung von `string` zu Branded Types erfolgt zentral
- **Konsistenz**: Mock-Daten und normalisierte Types verwenden beide Branded IDs
- **Tests verwenden Raw Strings**: Type Casts statt Branded Type Helper Functions
