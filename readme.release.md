# Release Management

Das Projekt verwendet semantische Versionierung und bietet Skripte für die automatisierte Erstellung von Production- und Development-Releases.

## Sicherheitschecks

Alle Release-Skripte verwenden das `safe-release.mjs` Skript, das folgende Sicherheitschecks durchführt:

- **Branch-Überprüfung**: Production Releases nur von main Branch
- **Working Directory Check**: Keine uncommitted Änderungen erlaubt
- **Git Pull**: Automatisches Holen der neuesten Änderungen
- **Fehlerbehandlung**: Automatischer Abbruch bei Problemen

## Branch Protection & Berechtigungen

**Wichtig**: Der main Branch ist durch Branch Protection Rules geschützt. Für die Erstellung von Releases sind spezielle Berechtigungen erforderlich:

- **Repository Admins** können Releases direkt vom main Branch erstellen (Bypass-Berechtigung)
- **Andere Contributors** benötigen Admin-Rechte oder müssen zur Bypass-Liste hinzugefügt werden
- Bei fehlenden Berechtigungen schlägt `npm run release:*` mit einem Branch Protection Fehler fehl

**Für neue Team-Mitglieder**: Falls Release-Erstellung fehlschlägt, kontaktiere einen Repository Admin zur Berechtigung.

**Alternative für Teams**: Für größere Teams kann später ein GitHub Actions Manual Workflow (`workflow_dispatch`) implementiert werden, der es allen Contributors mit Write-Zugriff ermöglicht, Releases über die GitHub UI zu erstellen, ohne lokale Branch Protection Bypass-Rechte zu benötigen.

## Production Releases (nur von main Branch)

Für die Erstellung von Production-Releases stehen drei Skripte zur Verfügung:

```bash
# Patch-Release (z.B. 1.0.0 → 1.0.1)
npm run release:patch

# Minor-Release (z.B. 1.0.0 → 1.1.0)
npm run release:minor

# Major-Release (z.B. 1.0.0 → 2.0.0)
npm run release:major
```

## Development Releases (von jedem Branch)

Für die Entwicklung und das Testen von Features können Development-Releases von jedem Branch erstellt werden:

```bash
# Development Patch-Release (z.B. 1.4.2 → 1.4.3-dev.0)
npm run release:dev:patch

# Development Minor-Release (z.B. 1.4.2 → 1.5.0-dev.0)
npm run release:dev:minor

# Development Major-Release (z.B. 1.4.2 → 2.0.0-dev.0)
npm run release:dev:major
```

**Verwendung von Development-Releases:**
- Ermöglicht schnelle Iteration während der Feature-Entwicklung
- Kann direkt in der Haupt-App getestet werden, ohne in main zu mergen
- Versionen folgen SemVer Pre-release Format (z.B. `1.4.3-dev.0`, `1.4.3-dev.1`)
- Werden als pre-release markiert

## Was passiert bei einem Release?

Jedes Release-Skript führt folgende Schritte automatisch aus:

1. **Version erhöhen**: Die Versionsnummer in `package.json` wird entsprechend erhöht
2. **Git-Commit**: Ein Commit mit der Nachricht `chore: release X.X.X` oder `chore: development release X.X.X-dev.X` wird erstellt
3. **Git-Tag**: Ein entsprechender Git-Tag wird erstellt
4. **Push**: Sowohl Commit als auch Tag werden zum Repository gepusht

## GitHub-Release anlegen

**GitHub Releases werden automatisch erstellt!**

Nach der Ausführung eines Release-Skripts passiert folgendes automatisch:

1. **Git-Tag wird gepusht**: Das Release-Skript erstellt und pusht den Git-Tag
2. **GitHub Actions startet**: Der `quality-assurance-release-and-publish-package.yml` Workflow wird durch den Tag-Push ausgelöst
3. **Tests laufen**: Linting, Type-Checking, Unit-Tests und Build werden ausgeführt
4. **Release wird erstellt**: GitHub Release wird automatisch mit korrekten Einstellungen erstellt:
   - **Production Releases**: Werden als "Latest release" markiert
   - **Development Releases**: Werden automatisch als "Pre-release" markiert
5. **Package Publishing**: Das Package wird direkt im selben Workflow zu GitHub Packages publiziert

**Keine manuellen Schritte mehr erforderlich!**

Die CI/CD-Pipeline (GitHub Actions) übernimmt die komplette Release-Erstellung und Package-Publishing automatisch in einem einzigen, atomaren Workflow.
