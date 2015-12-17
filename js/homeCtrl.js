angular.module('devMtIn').controller('homeCtrl', function($scope, profileService) {

  profileService.serviceTest();

  $scope.checkForProfile = function() {
    var profileId = localStorage.profileId;
    if (profileId) {
      profileService.getProfile(profileId)
      .then(
        function(response) {
          $scope.myProfile = response;
        }
      );
    } else {
      console.log('profile not found.');
    }
  };

  $scope.checkForProfile();

  $scope.sortOptions = [
    {
      display: 'Ascending',
      value: false
    },
    {
      display: 'Descending',
      value: true
    }
  ];

  $scope.editing = false;

  $scope.saveProfile = function(profileObj) {
    profileService.postProfile(profileObj)
    .then( // once promise fulfilled from profileService
      function(response) {
        $scope.editing = false; // switch off editing
        $scope.message = 'Profile created!';
      }
    );
  };

  $scope.deleteProfile = function() {
    profileService.deleteProfile(localStorage.profileId)
    .then(
      function(response) {
        delete localStorage.profileId;
        $scope.myProfile = {};
        $scope.message = 'Profile deleted.';
      }
    );
  };
});
