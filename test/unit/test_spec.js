const chai = require('chai'),
  sinon = require('sinon'),
  sinonChai = require('sinon-chai'),
  should = chai.should();

chai.use(sinonChai);

function hello(name, cb) {
  cb("hello " + name);
}

describe('hello', function() {

  it('should call callback with correct greeting', function() {

    var callback = sinon.spy();
    hello('foo', callback);

    callback.should.have.been.calledWith('hello foo');

  });

});
