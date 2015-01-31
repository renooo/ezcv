'use strict';

describe('Directive: mainSidenav', function () {

  // load the directive's module
  beforeEach(module('ezcvApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-sidenav></main-sidenav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the mainSidenav directive');
  }));
});
