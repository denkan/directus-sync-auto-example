import { exec } from 'child_process';

/**
 * Execute `npx directus-sync pull/push` command
 * @param {'pull' | 'push'} action
 */
export function runSync(action) {
  const validActions = ['pull', 'push'];
  const isValid = validActions.includes(action);
  if (!isValid) {
    console.error(`Invalid action: ${action}. Available options: ${validActions.join(', ')}`);
    return;
  }

  // set env vars needed for directus-sync
  process.env.HOST = process.env.HOST || '0.0.0.0';
  process.env.PORT = process.env.PORT || '8055';
  process.env.DIRECTUS_ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  process.env.DIRECTUS_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  process.env.DIRECTUS_URL = `http://${process.env.HOST}:${process.env.PORT}`;
  const configPath = process.env.DIRECTUS_SYNC_CONFIG_PATH;
  const configPathArg = configPath ? `--config-path ${configPath}` : '';

  const cwd = new URL('../../../', import.meta.url);
  const command = `npx directus-sync ${action} ${configPathArg}`;

  console.log(`Running: ${command}`);

  exec(command, { cwd }, (err, stdout, stderr) => {
    if (err) {
      console.error('error:', err);
      return;
    }
    stderr ? console.error('stderr:', stderr) : console.log(stdout);
  });
}

let timer;
export function runSyncDebounced(action, delay = 500) {
  clearTimeout(timer);
  timer = setTimeout(() => runSync(action), delay);
}
