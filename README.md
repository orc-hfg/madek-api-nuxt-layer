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

- siehe `Readme` im Hauptprojekt (es steht ein Skript in der `package.json` des Hauptprojekts bereit)
- optional kann zusätzlich der globale Link für das Layer-Projekt entfernt werden: `npm unlink` im Layer-Projekt ausführen

## API-Typen-Generierung

Die API-Typen in `generated/api` werden aus der OpenAPI-Spezifikation in `resources/openapi/swagger.json` generiert. Diese Dateien werden im Repository versioniert, um Konsistenz im Team zu gewährleisten.

### API-Typen aktualisieren

Wenn sich die OpenAPI-Spezifikation ändert, können die Typen neu generiert werden: `npm run generate:api`

## Neue Version erstellen und veröffentlichen
Um schnell neue Versionen zu veröffentlichen, stehen in der `package.json` drei Skripte zur Verfügung:

1. **Patch-Release** (z. B. `1.0.2` → `1.0.3`): `npm run prepare-release:patch`
2. **Minor-Release** (z. B. `1.0.2` → `1.1.0`): `npm run prepare-release:minor`
3. **Major-Release** (z. B. `1.0.2` → `2.0.0`): `npm run prepare-release:major`

### Was passiert dabei?

1. **Versionsnummer aktualisieren**
Je nachdem, welches Skript aufgerufen wird, passt `npm version` den entsprechenden Teil der Versionsnummer an (Patch, Minor oder Major).
Gleichzeitig erzeugt es einen neuen Commit und erstellt einen Git-Tag (z. B. `1.0.3`).

2. **Automatisches Pushen**
Danach wird sowohl der neue Commit als auch der Tag direkt ins GitHub-Repository gepusht (via `git push --follow-tags`).

### GitHub-Release anlegen

Nach dem erfolgreichen Push des Tags kann du auf GitHub ein neues Release erstellt werden:

1. **Releases-Seite öffnen**
Gehe im Repository in den Abschnitt **„Releases“**.
2. **Neues Release erstellen**
Klicke auf **„Create a new release“** oder **„Draft a new release“**
1. **Tag auswählen**
Wähle den eben erstellten Tag (z. B. `1.0.3`) aus der Dropdown-Liste aus.
1. **Release Details**
Gib einen Titel (z. B. `1.0.3`) ein und ergänze bei Bedarf Release Notes.
1. **Veröffentlichen**
Klicke auf **„Publish release“**.

Die CI/CD-Pipeline (GitHub Actions) reagiert auf das Erstellen eines neuen Releases und stellt es auf GitHub Packages zur Verwendung in der Haupt-App bereit.

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
