module.exports = {
  // See full example at https://github.com/tractr/directus-sync
  debug: true,
  dumpPath: './custom-directus-sync',
  collectionsPath: 'my-collections',
  onlyCollections: ['roles', 'permissions', 'settings'],
  //   excludeCollections: ['flows'],
  snapshotPath: 'my-snapshot',
  snapshot: true,
  split: true,
  specsPath: 'my-specs',
  specs: true,
};
