FROM directus/directus:10.11.1

USER root
RUN corepack enable
USER node

# Install external extensions
RUN pnpm install \ 
directus-extension-sync@1.1.6 \
directus-sync@1.5.3 

