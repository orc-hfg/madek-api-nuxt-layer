autoscale: true
footer: Madek API Nuxt Layer
slidenumbers: true
slide-transition: true

# Madek API Nuxt Layer
## Eine einheitliche Architektur für den Zugriff auf die Madek API

---

# Überblick

1. Was ist ein Nuxt Layer?
2. Nuxt Layer Grundlagen
3. BFF (Backend for Frontend) Pattern
4. Repository Pattern
5. Pinia Stores
6. Zusammenspiel der Komponenten
7. Wie profitieren die Apps?
8. Demo & Fragen

---

# 1. Was ist ein Nuxt Layer?

- Mini-Nuxt-App
- Code, Konfigurationen und Best Practices lassen sich teilen
- Reduziert Codeduplizierung
- Ermöglicht konsistente Implementierungen

---

# Architektur: Madek API Nuxt Layer

```
Nuxt Client Applications (Uploader, Schaufenster)
          |
          v
+------------------------------------------+
|          Madek API Nuxt Layer            |
|                                          |
| +--------------------------------------+ |
| |            BFF Pattern               | |
| |                                      | |
| | +---------------+    +-------------+ | |
| | | API Client    |<-->| Nitro Cache | | |
| | +---------------+    +-------------+ | |
| | | OpenAPI Types |                    | |
| | +---------------+                    | |
| +--------------------------------------+ |
|                   ^                      |
|                   |                      |
| +--------------------------------------+ |
| |         Repository Pattern           | |
| | +--------------+   +--------------+  | |
| | |SetRepository |   |UserRepository|  | |
| | +--------------+   +--------------+  | |
| +--------------------------------------+ |
|                   ^                      |
|                   |                      |
| +--------------------------------------+ |
| |            Pinia Stores              | |
| +--------------------------------------+ |
+------------------------------------------+
          |
          v
      Madek API
```

---

# Überblick der Layer-Komponenten

1. **BFF (Backend for Frontend)**: Schnittstelle zur Madek API
   - API Client + Caching
   - OpenAPI Types für Typsicherheit
   - Aufbereitung der Datenstruktur

2. **Repository Pattern**: Domänenfokussierte Abstraktion
   - SetRepository, UserRepository etc.
   - Domainspezifische Namensgebung und Gruppierung

3. **Pinia Stores**: Clientseitige Zustandsverwaltung
   - Reaktive Datenspeicherung
   - Integration mit Repositories

```
Client → Stores → Repositories → API Client → Madek API
                      (BFF Layer)
```

---

# 2. Nuxt Layer Grundlagen

- **Modulare Architektur**: Ermöglicht die Aufteilung des Codes in wiederverwendbare Schichten
- **Optimales Codesharing**: Einmal implementieren, überall nutzen
- **Zentrale Wartung**: Updates und Bugfixes nur an einer Stelle
- **Einfache Integration** in bestehende Anwendungen

```typescript
// nuxt.config.ts in Client-Anwendungen
export default defineNuxtConfig({
  extends: ['@orc-hfg/madek-api-nuxt-layer'],
  // Projekt-spezifische Konfiguration
})
```
---

# 3. BFF (Backend for Frontend) Pattern

- **Kernaufgabe**: Vermittlung zwischen Client und externer API
- **Komponenten**: API Client, OpenAPI Types, Nitro Cache
- **Vorteile**: Typsicherheit, zentralisierte Fehlerbehandlung, Caching, Datentransformation

---

## Snippet: API Client mit OpenAPI Types

```typescript
// Typdefinitionen aus API-Schema generiert
export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
	const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);

	const response = await fetchFromApi('/auth-info', {
		apiOptions: {
			isAuthenticationNeeded: true,
		},
		// Caching
		cache: freshOneHourCache,
	});

	// Datentransformation
	return {
		id: response.id,
		login: response.login,
		first_name: response.first_name,
		last_name: response.last_name,
	};
	// Fehlerbehandlung hier nicht sichtbar aber implementiert
	// Fehler werden zentral im BFF abgefangen
}
```

---

# 4. Repository Pattern

- **Kernkonzept**: Abstraktion des Datenzugriffs durch domänenspezifische Schnittstellen
- **Integration**: Nutzt das BFF (API Client) für API-Kommunikation

```
               +------------+                +----------+
Client ------> | Repository | <-----------> | API Client |
               +------------+                +----------+
```

---

## Snippet: Repository-Implementierung

```typescript
// app/utils/user-repository.ts
interface UserRepository {
  getAuthInfo: () => Promise<AuthInfo>;
}

function createUserRepository($madekApi: ApiFunction): UserRepository {
  return {
    async getAuthInfo(): Promise<AuthInfo> {
      return $madekApi('/auth-info');
    },
  };
}

export function getUserRepository(): UserRepository {
  const { $madekApi } = useNuxtApp();
  return createUserRepository($madekApi);
}
```

- **Vorteile**: Domänenspezifische Sprache, einheitliche Schnittstellen, bessere Testbarkeit

---

# 5. Pinia Stores

- **Kernaufgabe**: Verwaltung des reaktiven Zustands für UI-Komponenten
- **Schnittstelle**: Kommunikation mit Repositories für Datenabruf und -speicherung

```typescript
const sets = shallowRef<Collection[]>([]);

const userStore = useUserStore();
const setRepository = getSetRepository();

async function fetchData(): Promise<void> {
	const userId = userStore.id;

	if (userId !== undefined) {
		const data = await setRepository.getSets({ responsible_user_id: userId });
		sets.value = data;
	}
}
```

- **Vorteile**: Reaktives UI-Update, zentraler Datenzugriff, Statusverwaltung

---

# 6. Zusammenspiel der Komponenten

```
Client Apps ---> Pinia Stores ---> Repositories ---> API Client ---> Madek API
     ^             ^                                  (BFF Layer)
     |             |                                      |
     |             |                                      v
     |             |                                   Caching
     |             |                                      |
     |             |                                      v
     +-------------+--------------------------------------+
               Frontend-freundliche Datenstrukturen
```

- **Datenfluss**: Klare Trennung der Verantwortlichkeiten
- **Zugriffsregeln**:
  - Client-Komponenten nutzen nur Stores oder Repositories
  - Stores nutzen nur Repositories
  - Repositories nutzen nur API Client

- **Sicherheitsvorteile**: API-Credentials nie im Client verfügbar
- **Performance**: Optimierte Datenstrukturen und Caching

---

# 7. Wie profitieren die Apps?

---

# 7.1 Struktur

**Strukturierter Zugriff**

- Klare Hierarchie: Stores → Repositories → API-Client
- Eindeutige Zuständigkeiten, weniger Vermischung von Logik

---

# 7.2 Konsistenz

**Konsistente Entwicklung**

- Einheitliche Architektur in allen Projekten (Uploader, Schaufenster etc.)
- Gemeinsame, wiederverwendbare Codebasis (weniger Duplizierung)
- Schnellere Einarbeitung neuer Teammitglieder

---

# 7.3 Performance

**Optimierte Performance**

- Serverseitiges Caching über Nitro vermindert doppelte Requests
- Reduzierte Datenübertragung & schnellere Antwortzeiten

---

# 7.4 Codequalität

**Hohe Codequalität**

- Durchgängige Typsicherheit: API → Repositories → UI
- Zentrale Fehlerbehandlung & klarer Umgang mit Edge Cases
- Bessere Testbarkeit durch gekapselte Logik

---

# 8. Demo

- Integration in eine bestehende Anwendung
- Verwendung des Repositories und Stores
- API-Zugriff und Datenmanipulation
