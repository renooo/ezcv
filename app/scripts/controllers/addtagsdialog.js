'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:AddtagsdialogCtrl
 * @description
 * # AddtagsdialogCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('AddtagsdialogCtrl', function ($scope, $mdDialog, Tag) {
    $scope.tags = [];
    $scope.selection = {};

    Tag.get({}, function(tags){
    	$scope.tags = tags._embedded.tags;
    });

    $scope.cancel = function(){
    	$mdDialog.hide();
    };

    $scope.add = function(){
    	var tags = $scope.tags.filter(function(tag){
    		return $scope.selection[tag.id];
    	});
    	$mdDialog.hide(tags);
    };
  });
