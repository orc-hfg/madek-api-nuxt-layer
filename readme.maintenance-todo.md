# Aufgaben für den neuen Stand nach dem Dependency Update

- Wenn ein neues Update von `@nuxt/test-utils` vorhanden ist, sind dann auch folgende Updates möglich?
  - Update von `happy-dom` auf Version > 18
  - Update von `vitest` auf Version > 4 (https://vitest.dev/guide/migration.html)
- Wenn die Node LTS Version >= 24 ist, die Tests entsprechend anpassen (nach TODO-Kommentar `@upgrade-node24` suchen)
- Kann `"vitest": false` aus `knip.json` wieder entfernt werden? Läuft dann `npm run check:unused` fehlerfrei?
