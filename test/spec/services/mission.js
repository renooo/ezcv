'use strict';

describe('Service: Mission', function () {

  // load the service's module
  beforeEach(module('ezcvApp'));

  // instantiate service
  var Mission;
  beforeEach(inject(function (_Mission_) {
    Mission = _Mission_;
  }));

  it('should do something', function () {
    expect(!!Mission).toBe(true);
  });

});
