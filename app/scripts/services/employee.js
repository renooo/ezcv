'use strict';

/**
 * @ngdoc service
 * @name ezcvApp.Employee
 * @description
 * # Employee
 * Factory in the ezcvApp.
 */
angular.module('ezcvApp')
  .factory('Employee', function ($resource, $filter, appConfig, countries, jobs, companies) {
  	var prepareEntity = function(employee){
      if(angular.isDefined(employee.validation_messages)){
        return employee;
      }

			employee.zipCode = parseInt(employee.zipCode);

      if(angular.isObject(employee.birthdate)){
          employee.birthdate = new Date(employee.birthdate.date);
      }

      //Temporaire, le temps que max_depth arrive pour zf-hal : https://github.com/zfcampus/zf-hal/pull/88
      if(angular.isObject(employee._embedded.country)){
  			countries.then(function(collection){
  				employee._embedded.country = collection._embedded.countries.filter(function(country){ 
  					return (country.id == employee._embedded.country._links.self.href.match(/\/([a-z]{2,2})$/i)[1]);
  				})[0];
  			});
      }

      if(angular.isArray(employee._embedded.experiences)){
        angular.forEach(employee._embedded.experiences, function(experience){
          if(angular.isObject(experience._embedded.job)){
            jobs.then(function(collection){
              experience._embedded.job = collection._embedded.jobs.filter(function(job){
                return (job.id == experience._embedded.job._links.self.href.match(/\/([0-9]+)$/i)[1]);
              })[0];
            });
          }

          if(angular.isObject(experience._embedded.company)){
            companies.then(function(collection){
              experience._embedded.company = collection._embedded.companies.filter(function(company){
                return (company.id == experience._embedded.company._links.self.href.match(/\/([0-9]+)$/)[1]);
              })[0];
            });
          }

          if(angular.isObject(experience.dateStart)){
            experience.dateStart = new Date(experience.dateStart.date);
          }

          if(angular.isObject(experience.dateEnd)){
            experience.dateEnd = new Date(experience.dateEnd.date);
          }
        });
      }
      //-------------------------------------

      return employee;
  	};

    var prepareCollection = function(collection){
      angular.forEach(collection._embedded.employees, prepareEntity);
      return collection;
    };

    var prepareEntityToJson = function(employee){
      if(angular.isDate(employee.birthdate)){
        employee.birthdate = $filter('date')(employee.birthdate, 'y-MM-dd');
      }

      if(angular.isObject(employee._embedded.country)){
        employee.country = employee._embedded.country.id;
      }

      delete employee._embedded;
      return employee;
    };

    return $resource(appConfig.apiEndpoint + '/employee/:employeeId', {employeeId: '@id'}, {
    	update: {method: 'PUT', transformRequest: [prepareEntityToJson, angular.toJson], transformResponse: [angular.fromJson, prepareEntity]},
      query: {method: 'GET', transformResponse: [angular.fromJson, prepareCollection], isArray: false},
    	get: {method: 'GET', transformResponse: [angular.fromJson, prepareEntity]}
    });
  });
