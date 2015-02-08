'use strict';

describe('Service: toastMessage', function () {

  // load the service's module
  beforeEach(module('ezcvApp'));

  // instantiate service
  var toastMessage;
  beforeEach(inject(function (_toastMessage_) {
    toastMessage = _toastMessage_;
  }));

  it('should do something', function () {
    expect(!!toastMessage).toBe(true);
  });

});
