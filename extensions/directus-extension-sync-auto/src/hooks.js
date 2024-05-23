import { defineHook } from '@directus/extensions-sdk';
import { runSync, runSyncDebounced } from './run-sync';

const affectingModules = [
  'collections',
  'fields',
  'relations',
  'dashboards',
  'flows',
  'folders',
  'operations',
  'panels',
  'permissions',
  'presets',
  'roles',
  'settings',
  'translations',
  'webhooks',
];
const affectingActions = ['create', 'update', 'delete'];

/**
 * Add hooks to auto-sync Directus data on schema changes + on server start
 */
export default defineHook(({ action }) => {
  // Auto-pull on schema changes - if enabled
  const shouldAutoPull = isStringTruthy(process.env.DIRECTUS_SYNC_AUTO_PULL);
  if (shouldAutoPull) {
    affectingModules.forEach((moduleName) => {
      affectingActions.forEach((actionName) => {
        action(`${moduleName}.${actionName}`, () => {
          console.log(`Running sync on ${moduleName}.${actionName}`);
          runSyncDebounced('pull');
        });
      });
    });
  }

  // Auto-push on startup - if enabled
  const shouldAutoPush = isStringTruthy(process.env.DIRECTUS_SYNC_AUTO_PUSH);
  if (shouldAutoPush) {
    action('server.start', () => {
      runSync('push');
    });
  }
});

function isStringTruthy(str) {
  const isFalsey = [undefined, null, '', '0', 'no', 'false'].includes(str?.toLowerCase());
  return !isFalsey;
}
