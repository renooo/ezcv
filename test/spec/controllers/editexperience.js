'use strict';

describe('Controller: EditexperienceCtrl', function () {

  // load the controller's module
  beforeEach(module('ezcvApp'));

  var EditexperienceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditexperienceCtrl = $controller('EditexperienceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
