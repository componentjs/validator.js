var validate = require('./');

var options = {
  filename: '/User/jong/component.json'
};

validate({
  name: 'LOL'
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