const assert = require("assert")
const add = require("./add")

describe('add Demo', function() {
  it('should add correctly', function() {
    assert.equal(add(1,3), 4)
  });
});