'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:AddtagsdialogCtrl
 * @description
 * # AddtagsdialogCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('AddtagsdialogCtrl', function ($scope, $mdDialog, tags) {
    $scope.tags = [];
    $scope.selection = {};

    $scope.cancel = function(){
    	$mdDialog.hide();
    };

    $scope.add = function(){
    	var selectedTags = $scope.tags._embedded.tags.filter(function(tag){
    		return $scope.selection[tag.id];
    	});
    	$mdDialog.hide(selectedTags);
    };

    tags.then(function(tags){
        $scope.tags = tags;
    });

    // Tag.get({}, function(tags){
    //     $scope.tags = tags._embedded.tags;
    // });
  });
