'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.toastMessage
 * @description
 * # toastMessage
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('toastMessage', function ($mdToast) {
    return {
      show: function(message){
        return $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('bottom right')
            .hideDelay(6000)
        );
      }
    };
  });
