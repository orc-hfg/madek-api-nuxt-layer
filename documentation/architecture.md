# Caching

## Serverseitiges Caching (BFF)
- nutzerneutrale Daten können auf Server gecached werden, ohne besonderen cache key zu brauchen, der z.B. die user id enthält
- cross-request state pollution möglich, wenn nicht immer ein eindeutiger Key je Nutzer verwendet wird
- deshalb nur nutzerneutrale Daten auf Server cachen

## Clientseitiges Caching
- nutzerspezifische Daten können clientseitig gecached werden (getCachedData / useCachedAsyncData)
- Cache bleibt auch nach reload erhalten, erst Ende der Session löscht den Cache
- Debugging über Nuxt Dev Tools möglich: Keyed State from useAsyncData
- keine cross-request state pollution mit useAsyncData / useFetch, da automatisch jeder Request einen eigenen Rendering-Kontext (eine eigene Instanz der Vue App) bekommt
