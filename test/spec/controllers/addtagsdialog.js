'use strict';

describe('Controller: AddtagsdialogCtrl', function () {

  // load the controller's module
  beforeEach(module('ezcvApp'));

  var AddtagsdialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddtagsdialogCtrl = $controller('AddtagsdialogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
