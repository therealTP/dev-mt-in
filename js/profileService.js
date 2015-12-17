angular.module('devMtIn').service('profileService', function($http) {

  var baseUrl = 'http://connections.devmounta.in/';

  this.serviceTest = function() {
    console.log('Profile service is connected!');
  };

  this.postProfile = function(profileObj) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/profiles',
      data: profileObj
    })
    .then(
      function(response) {
        localStorage.setItem('profileId', response.data._id);
      })
    .catch(
      function(err) {
        console.log(err);
      }
    );
  };

  this.getProfile = function(profileId) {
    return $http({
      method: 'GET',
      url: baseUrl + 'api/profiles/' + profileId
    })
    .then(
      function(response) {
        return response.data;
      },
      function(response) {
        console.log('error with code ' + response.status);
      }
    );
  };

  this.deleteProfile = function(profileId) {
    return $http({
      method: 'DELETE',
      url: baseUrl + 'api/profiles/' + profileId
    })
    .then(
      function(response) {
        console.log("Profile successfully deleted");
        console.log(response);
        return response.data;
      },
      function(response) {
        console.log("Failed to delete profile, error code: " + response.status);
      }
    );
  };
});
