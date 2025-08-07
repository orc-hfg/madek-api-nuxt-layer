# Aufgaben für den neuen Stand nach dem Dependency Update

- Wenn die Node LTS Version >= 24 ist, die Tests entsprechend anpassen (nach TODO-Kommentar `@upgrade-node24` suchen)
- Kann `"vitest": false` aus `knip.json` wieder entfernt werden? Läuft dann `npm run check:unused` fehlerfrei?
- Ist diese Warnung (`[nuxt] error caught during app initialization undefined`) beim Ausführen der Tests weiterhin sichtbar?
