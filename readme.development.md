# Entwicklung

## Lokale Entwicklung des madek-api-nuxt-layer und Integration in ein Hauptprojekt

Damit neue oder geänderte Funktionen dieses Layers lokal in einer Nuxt-App (z.B. dem „Uploader") getestet werden können, ohne für jede Änderung ein neues Release zu erstellen, kann `npm link` (https://docs.npmjs.com/cli/v9/commands/npm-link) verwendet werden.

### Voraussetzungen

- dieses Repository ist lokal geklont
- ein Hauptprojekt (z.B. „Uploader"), in dem der Layer verwendet wird, ist ebenfalls lokal verfügbar

### 1. Dieses Layer-Projekt global verlinken

- in den Ordner dieses Layer-Projekts wechseln
  `cd /pfad/zu/madek-api-nuxt-layer`

- Link-Befehl ausführen:
  `npm link`

Damit wird das Paket global per Symlink registriert, so dass es in anderen Projekten per `npm link <package-name>` eingebunden werden kann.

**Hinweis:** in der `package.json` muss der Name korrekt gesetzt sein, z.B. `"name": "@orc-hfg/madek-api-nuxt-layer"`.

### 2. Lokales Linking im Hauptprojekt aktivieren

- in den Ordner des Hauptprojekts (z.B. „Uploader") wechseln:
  `cd /pfad/zum/hauptprojekt`

- Hauptprojekt mit lokal verlinkten Layer verbinden:
  `npm link @orc-hfg/madek-api-nuxt-layer`

Dadurch wird das lokale Layer-Projekt anstelle der in der package.json angegebenen (veröffentlichten) Version genutzt.

**Hinweis:** Im Hauptprojekt gibt es NPM-Skripte, die das Linking/Unlinking automatisieren (`npm run madek-api-nuxt-layer:link` und `npm run madek-api-nuxt-layer:unlink`).

### 3. Lokale Weiterentwicklung

- nun können die Dateien im Layer-Projekt bearbeitet werden (Plugins, Composables usw.)
- damit die Änderungen im Hauptprojekt wirksam werden, muss ggf. der Dev-Server neu gestartet bzw. auf HMR (Hot Module Replacement) gewartet werden
- die Haupt-App bezieht ab jetzt immer die lokalen Layer-Dateien aus dem Dateisystem, solange der Symlink aktiv ist

**Hinweis:** Nuxt Plugins dürfen nicht doppelt installiert werden. Beispielsweise darf Pinia nur im Layer-Projekt installiert sein.

### 4. Linking wieder auflösen (optional)

Wenn wieder die offizielle (z.B. auf npm oder Git referenzierte) Version verwenden werden soll:

- im Hauptprojekt das Skript `npm run madek-api-nuxt-layer:unlink` ausführen
- oder `npm install` im Hauptprojekt ausführen, dabei wird der Link automatisch aufgelöst

## API-Typen-Generierung

Die API-Typen in `generated/api` werden aus der OpenAPI-Spezifikation in `resources/openapi.json` generiert. Diese Dateien werden im Repository versioniert, um Konsistenz im Team zu gewährleisten.

### API-Typen aktualisieren

Wenn sich die OpenAPI-Spezifikation ändert, können die Typen neu generiert werden: `npm run generate:api`
