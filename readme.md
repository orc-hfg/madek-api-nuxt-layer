# Madek-API Nuxt Layer

Der Madek-API Nuxt Layer ist ein wiederverwendbares Nuxt-Layer-Package für die Integration mit der Madek-API der Hochschule für Gestaltung Karlsruhe. Das Layer stellt API-Clients, Typen, Composables und Server-Middleware für Nuxt-Anwendungen bereit.

## Schnellstart

1. Package installieren: `npm install @orc-hfg/madek-api-nuxt-layer`
2. Layer in `nuxt.config.ts` einbinden: `extends: ['@orc-hfg/madek-api-nuxt-layer']`
3. API-Konfiguration in Runtime Config setzen

## Projektdokumentation

Die Dokumentation ist in mehrere domänenspezifische README-Dateien aufgeteilt:

- [Entwicklung](./readme.development.md) – Lokales Linking, API-Typen-Generierung, Entwicklungsworkflow
- [Release Management](./readme.release.md) – Versioning, automatisierte Releases, GitHub Actions
- [Wartung](./readme.maintenance.md) – Dependency Updates, Node-Aktualisierung, bekannte Issues
- [Wartungsaufgaben](./readme.maintenance-todo.md) – Offene Wartungsaufgaben
- [Testing](./readme.testing.md) – Unit-Tests, Vitest-Konfiguration, Test-Utilities
- [TypeScript-Richtlinien](./readme.typescript.md) – Best Practices für TypeScript im Layer

## Architektur-Dokumentation

- [Architektur-Konzept / Teil 1](./documentation/architectural-concept-part-1.md)
- [Architektur-Konzept / Teil 2](./documentation/architectural-concept-part-2.md)
- [Architektur](./documentation/architecture.md)
