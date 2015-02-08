'use strict';

describe('Service: Jobs', function () {

  // load the service's module
  beforeEach(module('ezcvApp'));

  // instantiate service
  var Jobs;
  beforeEach(inject(function (_Jobs_) {
    Jobs = _Jobs_;
  }));

  it('should do something', function () {
    expect(!!Jobs).toBe(true);
  });

});
