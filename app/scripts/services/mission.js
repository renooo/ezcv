'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Mission
 * @description
 * # Mission
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Mission', function ($resource, appConfig) {
    var prepareEntityToJson = function(mission){
      if(angular.isNumber(mission.status)){
        return mission;
      }

      if(angular.isObject(mission._embedded.experience)){
        mission.experience = mission._embedded.experience.id;
      }

      if(angular.isArray(mission._embedded.tags) && mission._embedded.tags.every(angular.isObject)){
        mission.tags = mission._embedded.tags.map(function(tag){ return tag.id; });
      }

      delete mission._embedded;
      return mission;
    };

    return $resource(appConfig.apiEndpoint + '/mission/:missionId', {missionId: '@id'}, {
      query: {method: 'GET', isArray: false},
      save: {method: 'POST', transformRequest: [prepareEntityToJson, angular.toJson]},
      update: {method: 'PUT', transformRequest: [prepareEntityToJson, angular.toJson]}
    });
  });
