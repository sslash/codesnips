'use strict';

describe('Service: Codesnippet', function () {

  // load the service's module
  beforeEach(module('jsApp'));

  // instantiate service
  var Codesnippet;
  beforeEach(inject(function (_Codesnippet_) {
    Codesnippet = _Codesnippet_;
  }));

  it('should do something', function () {
    expect(!!Codesnippet).toBe(true);
  });

});
