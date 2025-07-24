# Madek-API Nuxt Layer

## Weiterführende Dokumentation

- [Architektur-Konzept / Teil 1](./documentation/architectural-concept-part-1.md)
- [Architektur-Konzept / Teil 2](./documentation/architectural-concept-part-2.md)
- [Architektur](./documentation/architecture.md)

## Lokale Entwicklung des madek-api-nuxt-layer und Integration in ein Hauptprojekt

Damit neue oder geänderte Funktionen dieses Layers lokal in einer Nuxt-App (z.B. dem „Uploader“) getestet werden können, ohne für jede Änderung ein neues Release zu erstellen, kann `npm link` (https://docs.npmjs.com/cli/v9/commands/npm-link) verwendet werden.

### Voraussetzungen:

- dieses Repository ist lokal geklont
- ein Hauptprojekt (z.B. „Uploader“), in dem der Layer verwendet wird, ist ebenfalls lokal verfügbar

### 1. Dieses Layer-Projekt global verlinken

- in den Ordner dieses Layer-Projekts wechseln
  `cd /pfad/zu/madek-api-nuxt-layer`

- Link-Befehl ausführen:
  `npm link`

Damit wird das Paket global per Symlink registriert, so dass es in anderen Projekten per `npm link <package-name>` eingebunden werden kann.

**Hinweis:** in der `package.json` muss der Name korrekt gesetzt sein, z.B. `"name": "@orc-hfg/madek-api-nuxt-layer"`.

### 2. Lokales Linking im Hauptprojekt aktivieren

- in den Ordner des Hauptprojekts (z.B. „Uploader“) wechseln:
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

## Release Management

Das Projekt verwendet semantische Versionierung und bietet Skripte für die automatisierte Erstellung von Production- und Development-Releases.

### Sicherheitschecks

Alle Release-Skripte verwenden das `safe-release.mjs` Skript, das folgende Sicherheitschecks durchführt:

- **Branch-Überprüfung**: Production Releases nur von main Branch
- **Working Directory Check**: Keine uncommitted Änderungen erlaubt
- **Git Pull**: Automatisches Holen der neuesten Änderungen
- **Fehlerbehandlung**: Automatischer Abbruch bei Problemen

### Production Releases (nur von main Branch)

Für die Erstellung von Production-Releases stehen drei Skripte zur Verfügung:

```bash
# Patch-Release (z.B. 1.0.0 → 1.0.1)
npm run release:patch

# Minor-Release (z.B. 1.0.0 → 1.1.0)
npm run release:minor

# Major-Release (z.B. 1.0.0 → 2.0.0)
npm run release:major
```

### Development Releases (von jedem Branch)

Für die Entwicklung und das Testen von Features können Development-Releases von jedem Branch erstellt werden:

```bash
# Development Patch-Release (z.B. 1.0.0 → 1.0.1-feature-xyz-2025-01-24T14-35-00.0)
npm run release:dev:patch

# Development Minor-Release (z.B. 1.0.0 → 1.1.0-feature-xyz-2025-01-24T14-35-00.0)
npm run release:dev:minor

# Development Major-Release (z.B. 1.0.0 → 2.0.0-feature-xyz-2025-01-24T14-35-00.0)
npm run release:dev:major
```

**Verwendung von Development-Releases:**
- Ermöglicht schnelle Iteration während der Feature-Entwicklung
- Kann direkt in der Haupt-App getestet werden, ohne in main zu mergen
- Versionen enthalten Branch-Name und Timestamp für eindeutige Identifikation
- Werden als pre-release markiert

### Was passiert bei einem Release?

Jedes Release-Skript führt folgende Schritte automatisch aus:

1. **Version erhöhen**: Die Versionsnummer in `package.json` wird entsprechend erhöht
2. **Git-Commit**: Ein Commit mit der Nachricht `chore: release vX.X.X` wird erstellt
3. **Git-Tag**: Ein entsprechender Git-Tag wird erstellt
4. **Push**: Sowohl Commit als auch Tag werden zum Repository gepusht

### GitHub-Release anlegen

Nach der Ausführung eines Release-Skripts sind noch folgende manuelle Schritte erforderlich:

**Für Production Releases:**

1. **Releases-Seite öffnen**
   Gehe im Repository in den Abschnitt **„Releases"**.
2. **Neues Release erstellen**
   Klicke auf **„Draft a new release"**
3. **Tag auswählen**
   Wähle den eben erstellten Tag (z.B. `1.1.0`) aus der Dropdown-Liste aus.
4. **Release Details**
   Gib einen Titel (z.B. `1.1.0`) ein und ergänze bei Bedarf Release Notes.
5. **Veröffentlichen**
   Klicke auf **„Publish release"**.

**Für Development Releases:**

1. **Releases-Seite öffnen**
   Gehe im Repository in den Abschnitt **„Releases"**.
2. **Neues Release erstellen**
   Klicke auf **„Draft a new release"**
3. **Tag auswählen**
   Wähle den eben erstellten Development-Tag (z.B. `1.1.0-feature-xyz-2025-01-24T14-35-00`) aus.
4. **Pre-release markieren**
   **Wichtig:** Aktiviere die Checkbox **„Set as a pre-release"**
5. **Release Details**
   Gib einen beschreibenden Titel ein (z.B. `1.1.0-feature-xyz (Development Release)`) und ergänze Informationen zum getesteten Feature.
6. **Veröffentlichen**
   Klicke auf **„Publish release"**.

Die CI/CD-Pipeline (GitHub Actions) reagiert auf das Erstellen eines neuen Releases und stellt es auf GitHub Packages zur Verwendung in der Haupt-App bereit.

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
- Wenn die Node LTS Version >= 24 ist, die Tests in entsprechend anpassen (nach TODO-Kommentar `@upgrade-node24` suchen)
- Kann happy-dom nun aktualisiert werden? https://github.com/nuxt/test-utils/issues/1323
- Testen, ob Update von @nuxt/text-utils auf Version > 3.18.0 nun funktioniert (alle Tests sollten ausgeführt werden): https://github.com/nuxt/test-utils/issues/1296
- Testen, ob Knip in Version ab 5.58.0 (5.61.0 ging zuletzt noch nicht) nun funktioniert und dieser Fehler nicht mehr auftritt: TypeError: Cannot assign to read only property 'defineNuxtConfig' of object '#<Object>'
- wenn die neuen Caching-Strategien verfügbar sind (ab Nuxt 3.18?), diese implementieren und die experimentellen Flags `purgeCachedData` und `granularCachedData` aus `nuxt.config.ts` entfernen:
  - https://github.com/nuxt/nuxt/pull/32003
  - https://github.com/nuxt/nuxt/issues/31949#issuecomment-2844391646
  - https://github.com/nuxt/nuxt/pull/31373
