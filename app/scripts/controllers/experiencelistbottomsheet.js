'use strict';

/**
 * @ngdoc function
 * @name ezcvApp.controller:ExperiencelistbottomsheetCtrl
 * @description
 * # ExperiencelistbottomsheetCtrl
 * Controller of the ezcvApp
 */
angular.module('ezcvApp')
  .controller('ExperiencelistbottomsheetCtrl', function ($scope, $mdBottomSheet) {
  	$scope.edit = function(){
		$mdBottomSheet.hide('edit');
  	};

  	$scope.delete = function(){
  		$mdBottomSheet.hide('delete');
  	};
  });
