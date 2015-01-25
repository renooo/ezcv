'use strict';

describe('Service: Employee', function () {

  // load the service's module
  beforeEach(module('ezcvApp'));

  // instantiate service
  var Employee;
  beforeEach(inject(function (_Employee_) {
    Employee = _Employee_;
  }));

  it('should do something', function () {
    expect(!!Employee).toBe(true);
  });

});
