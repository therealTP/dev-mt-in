angular.module('devMtIn').controller('homeCtrl', function($scope, profileService) {

  $scope.myProfile = profileService.checkForProfile();

  profileService.serviceTest();

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
    profileService.saveProfile(profileObj);
    $scope.editing = false; // switch off editing
  };

  $scope.deleteProfile = function() {
    profileService.deleteProfile();
  };
});
