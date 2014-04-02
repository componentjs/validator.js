
var warn = require('component-consoler').warn;

module.exports = function validateComponentJSON(component, options) {
  options = options || {};
  var verbose = options.verbose !== false;
  var filename = options.filename || '';
  if (filename) {
    // remove a trailing slash just incase
    if (filename.slice(-1) === '/') filename = filename.slice(0, -1);
    // add /component.json just to be consistent
    if (!/\/component\.json$/.test(filename)) filename += '/component.json';
    if (filename) filename = '\033[35m' + filename + '\033[90m';
  }

  // local components do not have to have a name
  if ('name' in component
    && !/^[a-z0-9-]+$/.test(component.name)
    && verbose) {
    if (filename) warn('validate', filename);
    warn('validate', '"\033[31m' + component.name + '\033[90m" is an invalid component name.');
    warn('validate', 'Component names may only contain lowercased alphanumerics and dashes.');
    console.error();
  }

  // `repo` is changed to `repository` for consistency
  // and because abbreviations are pointless
  if (component.repo) {
    if (verbose) {
      if (filename) warn('validate', filename);
      warn('validate', '.repo is deprecated. Use .repository instead.');
      console.error();
    }

    component.repository = component.repo;
    delete component.repo;
  }

  // `local` is changed to `locals` because it's an array
  if (component.local) {
    if (verbose) {
      if (filename) warn('validate', filename);
      warn('validate', '.local is deprecated. Use .locals instead.');
      console.error();
    }

    component.locals = component.local;
    delete component.local;
  }

  // .development used to be .devDependencies,
  // but now it's a hash of .devDependencies, .scripts, etc.
  var development = component.development || {};
  if (Object.keys(development).length
    && ~Object.keys(development)[0].indexOf('/')) {
    if (verbose) {
      if (filename) warn('validate', filename);
      warn('validate', '.development\'s signature has changed.');
      warn('validate', 'You probably want `.development.dependencies = {}`.');
      console.error();
    }

    component.development = {
      dependencies: component.development
    };
  }

  return component;
}
