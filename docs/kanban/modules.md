# Modules

What this project is made of — one line per module, each led by its **bolded name**, then
what it is and the paths it covers. A module is a part of the product that grows on its
own, judged by meaning, not by folder.

If a line here disagrees with the repo you just read, fix the line.

- **browse-search** — trending/popular/top-rated TMDB movies and TV, merged movie+TV search. `pages/index.tsx`, `lib/discoverMerge.ts`.
- **where-to-watch** — per-title stream/rent/buy availability grouped by country and continent. `pages/details/`, `lib/getDisplayCountries.ts`, `lib/countryContinents.ts`, `lib/providerCatalog.ts`.
- **account-preferences** — Google sign-in and saved favorite countries/services. `pages/settings.tsx`, `components/ServicePicker.tsx`, `lib/AuthContext.tsx`, `lib/firebase.ts`, `lib/firestore.ts`, `lib/preferences.ts`, `lib/providerPreferences.ts`.
- **status-monitoring** — live TMDB health banner and outage alerting. `components/StatusBanner.tsx`, `pages/api/health`, `pages/api/cron/`, `lib/notifications.ts`.
