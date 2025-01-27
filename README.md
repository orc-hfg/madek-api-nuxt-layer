# Madek-API Nuxt Layer

## Lokale Entwicklung des madek-api-nuxt-layer und Integration in ein Hauptprojekt

Damit neue oder geänderte Funktionen dieses Layers lokal in einer Nuxt-App (z. B. dem „Uploader“) getestet werden können, ohne für jede Änderung ein neues Release zu erstellen, empfiehlt sich das Vorgehen mit `npm link` (https://docs.npmjs.com/cli/v9/commands/npm-link).

### Voraussetzungen:
- dieses Repository ist lokal geklont
- ein Hauptprojekt (z. B. „Uploader“), in dem der Layer verwendet wird, ist ebenfalls lokal verfügbar

### 1. Dieses Layer-Projekt global verlinken
- in den Ordner dieses Layer-Projekts wechseln
`cd /pfad/zu/madek-api-nuxt-layer`

- Link-Befehl ausführen:
`npm link`

Damit wird das Paket global per Symlink registriert, so dass es in anderen Projekten per `npm link <package-name>` eingebunden werden kann.
-	**Hinweis:** in der `package.json` muss der Name korrekt gesetzt sein, z. B. `"name": "@orc-hfg/madek-api-nuxt-layer"`.

### 2. Lokales Linking im Hauptprojekt aktivieren
- in den Ordner des Hauptprojekts (z. B. „Uploader“) wechseln:
`cd /pfad/zum/hauptprojekt`

- Hauptprojekt mit lokal verlinkten Layer verbinden:
`npm link @orc-hfg/madek-api-nuxt-layer`

Dadurch wird das lokale Layer-Projekt anstelle der in der package.json angegebenen (veröffentlichten) Version genutzt.

**Hinweis:** Im Hauptprojekt gibt es NPM-Skripte, die das Linking/Unlinking automatisieren.

### 3. Lokale Weiterentwicklung
- nun können die Dateien im Layer-Projekt bearbeiten werden (Plugins, Composables usw.)
- damit die Änderungen im Hauptprojekt wirksam werden, muss ggf. der Dev-Server neu gestartet bzw. auf HMR (Hot Module Replacement) gewartet werden
- die Haupt-App bezieht ab jetzt immer die lokalen Layer-Dateien aus dem Dateisystem, solange der Symlink aktiv ist

### 4. Linking wieder auflösen (optional)
Wenn wieder die offizielle (z. B. auf npm oder Git referenzierte) Version verwenden werden soll:

- Symlink für das Hauptprojekt entfernen: siehe `Readme` im Hauptprojekt (es steht ein Skript in der `package.json` bereit)
- optional kann zusätzlich der globale Link für das Layer-Projekt entfernt werden: `npm unlink` im Layer-Projekt ausführen


## Dependency Updates

### 1. Node-Version aktualisieren (auf aktuelle LTS-Version)

Die aktuelle Node-LTS-Version herausfinden:
- `nvm ls-remote --lts | tail -n 1` ausführen
- falls der Node Version Manager (`nvm`) nicht verfügbar ist, hier nachschauen: https://github.com/nodejs/Release?tab=readme-ov-file#release-schedule

Folgende Dateien entsprechend anpassen:
- `.nvmrc`
- `package.json` im Abschnitt "engines"
- `nvm use && npm install` ausführen, damit die definierte Node-Version (`.nvmrc`) in der aktuellen Shell aktiviert wird und die Abhängigkeiten für diese installiert werden (`package-lock.json`)

### 2. Externe Abhängigkeiten aktualisieren

`npm run check-updates` verwenden, Updates installieren und währenddessen immer wieder die Funktionalität testen.

### 3. Aufgaben für das nächste Dependency Update bearbeiten und ggf. neue erstellen
