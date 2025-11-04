# Aufgaben für den neuen Stand nach dem Dependency Update

- Wenn ein neues Update von `@nuxt/test-utils` vorhanden ist, sind dann auch folgende Updates möglich?
  - Update von `happy-dom` auf Version > 18
  - Update von `vitest` auf Version > 4 (https://vitest.dev/guide/migration.html)
  - https://github.com/nuxt/test-utils/issues/1452
  - **Stand 04.11.2025**: Update auf `vitest@4.0.7` nicht möglich wegen Peer-Dependency-Konflikt
    - `@nuxt/test-utils@3.20.1` benötigt `vitest@^3.2.0`
    - Aktuell blockiert bei `vitest@3.2.4`
    - Warten auf Update von `@nuxt/test-utils` mit Vitest 4-Unterstützung
- Wenn die Node LTS Version >= 24 ist, die Tests entsprechend anpassen (nach TODO-Kommentar `@upgrade-node24` suchen)
