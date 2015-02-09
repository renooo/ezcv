'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Experience
 * @description
 * # Experience
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Experience', function ($resource, $filter, appConfig) {
  	var prepareEntityToJson = function(experience){
        if(angular.isNumber(experience.status)){
            return experience;
        }
		    if(angular.isDate(experience.dateStart)){
          experience.dateStart = $filter('date')(experience.dateStart, 'y-MM-dd');
        }

		    if(angular.isDate(experience.dateEnd)){
          experience.dateEnd = $filter('date')(experience.dateEnd, 'y-MM-dd');
        }

        if(angular.isObject(experience._embedded.employee)){
        	experience.employee = experience._embedded.employee.id;
        }

        if(angular.isObject(experience._embedded.job)){
        	experience.job = experience._embedded.job.id;
        }

        if(angular.isObject(experience._embedded.company)){
        	experience.company = experience._embedded.company.id;
        }

        delete experience._embedded;
        return experience;
  	};

    return $resource(appConfig.apiEndpoint + '/experience/:experienceId', {experienceId: '@id'}, {
    	save: {method: 'POST', transformRequest: [prepareEntityToJson, angular.toJson]},
    	update: {method: 'PUT', transformRequest: [prepareEntityToJson, angular.toJson]},
    	query: {method: 'GET', isArray: false}
    });
  });
