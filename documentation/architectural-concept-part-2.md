autoscale: true
footer: Repository Pattern mit und ohne BFF im Vergleich
slidenumbers: true
slide-transition: true

# Repository Pattern mit und ohne BFF im Vergleich

---

# Überblick

1. Das Problem: Vermischte Verantwortlichkeiten
2. Lösungsansatz 1: Repository Pattern
3. Lösungsansatz 2: Repository + BFF
4. Vor- und Nachteile im Vergleich
5. Caching-Strategien
6. Diskussion

---

# Das Problem: Vermischte Verantwortlichkeiten

---

```typescript
// Ansatz 1: Direkter API-Zugriff im Store (problematisch)
export const useUserStore = defineStore('user', () => {
  const authInfo = shallowRef<AuthInfo | null>(null);

  async function fetchAuthInfo() {
    try {
      // 1. Direkter API-Aufruf
      const response = await $fetch(
        `${config.public.madekApi.baseURL}/auth-info`,
        {
          headers: {
            Authorization: `token ${config.madekApi.token}`
          }
        }
      );

      // 2. API-Transformation im Store
      authInfo.value = {
        id: response.id,
        login: response.login,
        first_name: response.first_name,
        last_name: response.last_name,
      };
    } catch (error) {
      // 3. Fehlerbehandlung im Store
      console.error('API Error:', error);
    }
  }

  return { authInfo, fetchAuthInfo };
});
```

---

# Probleme mit direktem API-Zugriff

* **Vermischte Logik**: API-Zugriff, Transformation und Fehlerbehandlung in einer Komponente
* **Hohe Kopplung**: Store kennt alle API-Details (Endpunkt, Auth-Methode, Datenstruktur)
* **Schlechte Wiederverwendbarkeit**: Logik ist im Store eingeschlossen
* **Schwierige Tests**: Direkter API-Aufruf erschwert Unit-Testing

---

# Lösungsansatz 1:
## Repository Pattern

---

```typescript
// Store mit Repository Pattern (ohne BFF)
export const useUserStore = defineStore('user', () => {
  const authInfo = shallowRef<AuthInfo | null>(null);

  // Repository über Composable injizieren
  const userRepository = getUserRepository();

  async function fetchAuthInfo() {
    try {
      // Der Store kommuniziert nur mit dem Repository
      // und kennt keine API-Details
      authInfo.value = await userRepository.getAuthInfo();
    } catch (error) {
      // Fehlerbehandlung auf Store-Ebene
      console.error('Repository Error:', error);
    }
  }

  return { authInfo, fetchAuthInfo };
});
```

---

```typescript
// Repository mit gekapselter API-Zugriffslogik
interface UserRepository {
  getAuthInfo: () => Promise<AuthInfo>;
}

// Repository nutzt den API-Client
function createUserRepository(): UserRepository {
  const { fetchFromApi } = createApiClient();

  return {
    async getAuthInfo(): Promise<AuthInfo> {
      // Weniger Code-Duplizierung durch API-Client
      const response = await fetchFromApi<MadekAuthInfoResponse>('/auth-info');

      // Transformation bleibt im Repository
      return {
        id: response.id,
        login: response.login,
        first_name: response.first_name,
        last_name: response.last_name,
      };
    },
  };
}
```

---

# Architektur mit Repository Pattern

```
+---------------------------------------+
|           Pinia Store                 |
|  (useUserStore, useSetsStore)     |
+---------------------------------------+
                  ↑
+---------------------------------------+
|          Repository                   |
|  (UserRepository, SetRepository)      |
+---------------------------------------+
                  ↑
+---------------------------------------+
|          Madek API                    |
+---------------------------------------+
```

---

# Lösungsansatz 2:
## Repository + BFF

---

**BFF**

```typescript
// Ansatz 2: BFF im server/utils/auth-info.ts
export async function getAuthInfo(event: H3Event): Promise<AuthInfo> {
  const { fetchFromApi } = createMadekApiClient<MadekAuthInfoResponse>(event);

  try {
    // Serverseitiger API-Aufruf mit Caching und sicherem Token-Handling
    const response = await fetchFromApi('/auth-info', {
      apiOptions: {
        isAuthenticationNeeded: true,
      },
      cache: freshOneHourCache,
    });

    // Transformation und Filterung auf dem Server
    return {
      id: response.id,
      login: response.login,
      first_name: response.first_name,
      last_name: response.last_name,
    };
  }
  catch {
    // Zentrale Fehlerbehandlung
    throw createError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      statusMessage: 'Failed to fetch authenticated info.',
    });
  }
}
```

---

**Repository**

```typescript
// In app/utils/user-repository.ts - Vereinfachtes Repository
function createUserRepository($madekApi: ApiFunction): UserRepository {
  return {
    async getAuthInfo(): Promise<AuthInfo> {
      // Ruft die BFF-API auf, nicht direkt die Madek-API
      return $madekApi('/auth-info');
    },
  };
}
```

---

# Vollständige Architektur mit Repository + BFF

```
+---------------------------------------+
|           Pinia Store                 |
|  (useUserStore, useSetsStore)     |
+---------------------------------------+
                  ↑
+---------------------------------------+
|          Repository                   |
|  (UserRepository, SetRepository)      |
+---------------------------------------+
                  ↑
+---------------------------------------+
|             BFF                       |
|  (server/utils/auth-info.ts,          |
|   server/utils/collections.ts)        |
+---------------------------------------+
                  ↑
+---------------------------------------+
|          Madek API                    |
+---------------------------------------+
```

---

# Kernvorteile der verschiedenen Ansätze

| Ansatz | Vorteile |
|--------|------------|
| **Direkter API-Zugriff** | • Einfachste Implementierung<br>• Minimaler Boilerplate-Code |
| **Repository Pattern** | • **Klare Trennung der Verantwortlichkeiten**<br>• Wiederverwendbarkeit<br>• Testbarkeit<br>• Reduzierte Kopplung |
| **Repository + BFF** | • **Maximale Trennung der Verantwortlichkeiten**<br>• **Bessere Wartbarkeit bei API-Änderungen**<br>• Serverseitiges Caching<br>• Zentrale Fehlerbehandlung<br>• API-Token-Sicherheit<br>• Keine CORS-Probleme |

---

# Repository ohne BFF: Vor- und Nachteile

**Vorteile:**

- **Einfachere Architektur**: Eine Schicht weniger bedeutet weniger Komplexität
- **Direktere Datenflüsse**: Kürzerer Weg von API zum Client
- **Gute Kapselung möglich**: Auch ohne BFF lässt sich API-Zugriff gut kapseln

**Nachteile:**

- **Fehlende serverseitige Verarbeitung**: Keine Möglichkeit für serverseitiges Caching
- **Eingeschränkte Sicherheit**: API-Tokens müssen clientseitig verfügbar sein (nur in Development)
- **Begrenzte Fehlerbehandlung**: Keine zentrale, serverseitige Fehlerbehandlung
- **Fehlende API-Transformation**: API-Änderungen erfordern Client-Updates
- **Mögliche CORS-Probleme**: Bei domainübergreifenden API-Aufrufen vom Client aus

---

# Entscheidungsmatrix

| Aspekt | Nur Repository | Repository + BFF |
|--------|---------------|---------------|
| Komplexität | Niedrig | Mittel |
| Caching | Clientseitig | Serverseitig (Nitro) |
| Fehlerbehandlung | Dezentral | Zentral |
| API-Änderungen | Client-Anpassung nötig | Nur BFF-Anpassung |
| Performance | Mehr clientseitige Arbeit | Serverseitige Optimierung möglich |
| API-Tokens | Im Client sichtbar | Nur auf Server |
| Wartbarkeit | Mittelmäßig | Gut |
| CORS | Mögliche Probleme | Keine Probleme |

---

# Caching-Strategien im Detail

---

# Grundprinzipien für die Caching-Entscheidung

| Serverseitiges Caching (Nitro) | Clientseitiges Caching (Browser) |
|--------------------------------|------------------------------------------|
| Öffentliche, nutzerneutrale Daten | Personalisierte, nutzerspezifische Daten |
| Häufig abgefragte, selten ändernde Daten | Benutzerpräferenzen und Einstellungen |
| Daten, die viele Nutzer gleichzeitig benötigen | Temporäre Zustände einer Session |
| Ressourcenintensive API-Aufrufe | Daten mit sehr kurzer Lebensdauer |

---

# Überlegungen zum Caching

## Serverseitiges Caching (BFF)

**Vorteile:**
- Reduziert Last auf die Madek-API
- Schnellere Antwortzeiten für alle Nutzer
- Zentrale Cache-Kontrolle

**Bedenken:**
- Cache-Isolation zwischen Nutzern sicherstellen
- Cache-Schlüssel müssen sorgfältig designt werden
- Nicht für alle Daten geeignet

---

# Hybride Caching-Strategie

**Für serverseitiges Caching:**

- Öffentliche, nutzerneutrale Daten
- Ressourcenintensive API-Aufrufe
- Referenzdaten mit seltenen Änderungen

**Für clientseitiges Caching:**

- Personalisierte, nutzerspezifische Daten
- Temporäre Zustände einer Session
- Daten, die häufigen Änderungen unterliegen

---

# BFF: Wann ist es wirklich nötig?

**Repository ohne BFF kann ausreichend sein, wenn:**

- Sessionbasierte Authentifizierung verwendet wird (z.B. via Cookies)
- Wenige gleichzeitige Nutzer auf das System zugreifen
- Die Backend-API keine strengen Ratenlimits hat
- API-Daten ohne komplexe Transformation verwendet werden können

**BFF bleibt vorteilhaft bei:**

- Vielen gleichzeitigen Nutzern (geteilter serverseitiger Cache)
- Notwendigkeit zur Reduzierung der API-Last
- Komplexen Datentransformationen
- Zentraler Fehlerbehandlung und Logging

---

# Diskussion

* **Klare Verantwortlichkeiten**: Wie wichtig ist für unser Team die strikte Trennung von API-Logik und Anwendungslogik?
* **Wartbarkeit**: Wie häufig erwarten wir Änderungen an der Madek-API und wie kritisch sind schnelle Anpassungen?
* Ist der Mehraufwand für die zusätzliche Abstraktionsschicht in unserem Madek-API-Layer langfristig gerechtfertigt?
* Wie relevant ist serverseitiges Caching der API-Anfragen für unser Projekt?
