
module.exports = function validateComponentJSON(component, options) {
  options = options || {};
  var verbose = options.verbose !== false;

  // local components do not have to have a name
  if ('name' in component
    && !/^[a-z0-9-]+$/.test(component.name)
    && verbose) {
    console.error('  \033[33mwarning\033[90m: "\033[31m%s\033[90m" is an invalid component name.', component.name);
    console.error('    Component names may only contain lowercased alphanumerics and dashes.\033[0m');
    printFilename();
  }

  // `repo` is changed to `repository` for consistency
  // and because abbreviations are pointless
  if (component.repo) {
    if (verbose) {
      console.error('  \033[33mwarning\033[90m: .repo is deprecated. Use .repository instead.\033[0m');
      printFilename();
    }
    component.repository = component.repo;
    delete component.repo;
  }

  // `local` is changed to `locals` because it's an array
  if (component.local) {
    if (verbose) {
      console.error('  \033[33mwarning\033[90m: .local is deprecated. Use .locals instead.\033[0m');
      printFilename();
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
      console.error('  \033[33mwarning\033[90m: `.development`\'s signature has changed.');
      console.error('    You probably want `.development.dependencies = {}`.');
      printFilename();
    }

    component.development = {
      dependencies: component.development
    };
  }

  return component;

  function printFilename() {
    if (!options.filename) return '';
    console.error('    \033[90m- "\033[96m%s\033[90m"\033[0m', options.filename);
  }
}