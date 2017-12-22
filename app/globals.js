var file = 'foo.txt';

var helpers = {
  test: function () {
    console.log('test streaming');
  },
  parse: function () {
    console.log('parsing streaming');
  },
};

console.log(file);

helpers.test();
helpers.parse();