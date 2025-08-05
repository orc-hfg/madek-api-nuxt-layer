# Wartung

## Dependency Updates

### 1. Node-Version aktualisieren (auf aktuelle LTS-Version)

Die aktuelle Node-LTS-Version herausfinden:

Per Skript:
- `npm run check:node`

Manuell:
- `nvm ls-remote --lts | tail -n 1` ausführen
- falls der Node Version Manager (`nvm`) nicht verfügbar ist, hier nachschauen: https://github.com/nodejs/Release?tab=readme-ov-file#release-schedule

Folgende Dateien entsprechend anpassen:
- `.nvmrc`
- `package.json` im Abschnitt "engines"
- `nvm use && npm install` ausführen, damit die definierte Node-Version (`.nvmrc`) in der aktuellen Shell aktiviert wird und die Abhängigkeiten für diese installiert werden (`package-lock.json`)

### 2. Externe Abhängigkeiten aktualisieren

- `npm run upgrade` ausführen, um Nuxt zu updaten.
- `npm run check:updates` verwenden, Updates installieren und währenddessen immer wieder die Funktionalität testen.
- Angaben zu Peer Dependencies in `package.json` mit neuen Versionen aktualisieren

### 3. Aufgaben für das nächste Dependency Update bearbeiten und ggf. neue erstellen

- Wenn die Node LTS Version >= 24 ist, die Tests entsprechend anpassen (nach TODO-Kommentar `@upgrade-node24` suchen)
- Kann `"vitest": false` aus `knip.json` wieder entfernt werden? Läuft dann `npm run check:unused` fehlerfrei?
- Ist diese Warnung (`[nuxt] error caught during app initialization undefined`) beim Ausführen der Tests weiterhin sichtbar?

## Bekannte Issues

### Knip Vitest Plugin Kompatibilität

Knip's Vitest-Plugin ist nicht kompatibel mit Nuxt 4's Test-Utils. Daher ist `"vitest": false` in der `knip.json` Konfiguration erforderlich, um Fehler zu vermeiden.
