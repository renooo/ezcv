'use strict';

describe('Service: Company', function () {

  // load the service's module
  beforeEach(module('ezcvApp'));

  // instantiate service
  var Company;
  beforeEach(inject(function (_Company_) {
    Company = _Company_;
  }));

  it('should do something', function () {
    expect(!!Company).toBe(true);
  });

});
