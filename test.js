var validate = require('./');

var options = {
  filename: __dirname
};

validate({
  name: 'LOL'
}, options);

validate({
  name: 'lkjasdf.kljasdf'
}, options);

validate({
  name: 'lkajsdf_lkjasldjkf'
}, options);

validate({
  name: 'klasdjf-askljdf'
}, options);

validate({
  local: [
    'a',
    'b'
  ]
}, options);

validate({
  repo: 'kljasdf/kljalksjdf'
}, options)

validate({
  development: {
    'component/emitter': "1.0.0"
  }
}, options);