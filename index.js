module.exports = function (component, options) {
  options = options || {};

  var filename = options.filename
    ? '  \033[90m- "\033[96m%s\033[90m"\033[0m'
    : '';

  if ('name' in component && !/^[a-z0-9-]+$/.test(component.name)) {
    console.error('  \033[33mwarning\033[90m: "\033[31m%s\033[90m" is an invalid component name.', component.name);
    console.error('    Component names may only contain lowercased alphanumerics and dashes.\033[0m')
    if (options.filename) console.error(filename, options.filename);
  }

  if (component.local) {
    console.error('  \033[33mwarning\033[90m: .local is deprecated. Use .locals instead.\033[0m');
    if (options.filename) console.error(filename, options.filename);

    component.locals = component.local;
    delete component.local;
  }

  var development = component.development || {};
  if (Object.keys(development).length
    && ~Object.keys(development)[0].indexOf('/')) {
    console.error('  \033[33mwarning\033[90m: `.development`\'s signature has changed.');
    console.error('    You probably want `.development.dependencies = {}`.');
    console.error('    Please review the latest component.json specifications.\033[0m');
    if (options.filename) console.error(filename, options.filename);

    component.development = {
      dependencies: component.development
    };
  }
}