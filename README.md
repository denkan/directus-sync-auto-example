# Directus + auto-sync of schema/collections - an example setup

This is a result of my own testings with Directus, where I wanted a boilerplate setup with schema changes reflected as files so they can be version controlled and deployed on various stage/prod environments.

## How it works

1. Simple Directus setup with Docker and Docker Compose for local development.
2. Adding [`directus-extension-sync`](https://www.npmjs.com/package/directus-extension-sync) and [`directus-sync`](https://www.npmjs.com/package/directus-sync), which offers handy CLI for managing and synchronizing the schema and collections within Directus.
3. Creating a custom extension (`directus-extension-sync-auto`) that executes `npx directus-sync pull/push` on schema change and startup hooks.

### Use env vars to toggle auto push/pull

The custom extension introduces three new environment variables:

- `DIRECTUS_SYNC_AUTO_PULL` - set to `true` to auto-backup schemas and collections on changes in UI.
- `DIRECTUS_SYNC_AUTO_PUSH` - set to `true` to auto-sync backed-up schemas and collections on server start.
- `DIRECTUS_SYNC_CONFIG_PATH` - set to any custom config file for `directus-sync`. See all options available in [their repo](https://github.com/tractr/directus-sync?tab=readme-ov-file#available-options).

Typically, you would have both auto-pull and auto-push enabled for local development, but only auto-push on stage/prod.
