'use strict';

describe('Service: Modalservice', function () {

  // load the service's module
  beforeEach(module('codesnipzApp'));

  // instantiate service
  var Modalservice;
  beforeEach(inject(function (_Modalservice_) {
    Modalservice = _Modalservice_;
  }));

  it('should do something', function () {
    expect(!!Modalservice).toBe(true);
  });

});
