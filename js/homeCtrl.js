angular.module('devMtIn').controller('homeCtrl', function($scope, profileService, friendService) {

  profileService.serviceTest();
  $scope.message = 'No message';

  $scope.checkForProfile = function() {
    var profileId = localStorage.profileId;
    if (profileId) {
      profileService.getProfile(profileId)
      .then(
        function(profile) {
          $scope.myProfile = profile.data;
          return $scope.myProfile;
        }
      ).then(
        function(response) {
          console.log(response);
          friendService.findFriendsFriends(response)
          .then(
            function(newProfile) {
              $scope.myProfile = newProfile;
              console.log($scope.myProfile.friends[6].friends[0].name);
            }
          );
      });

      // console.log($scope.myProfile);
      } else {
        console.log('profile not found.');
      }
    };

  $scope.checkForProfile();

  $scope.getProfile = function(profileId) {
    profileService.getProfile(profileId)
    .then(
      function(response) {
        console.log(response.data.friends[0].name);
      }
    );
  };

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

  $scope.findFriends = function(query) {
    friendService.findFriends($scope.myProfile._id, query)
    .then(
      function(response) {
        console.log(response);
        $scope.potentialFriends = response;
      },
      function(response) {
        console.log('Error with response text ', response);
      }
    );
  };

  $scope.addFriend = function(friendId) {
    friendService.addFriend($scope.myProfile._id, friendId).
    then(
      function(response) {
        $scope.checkForProfile();
      },
      function(response) {
        console.log(response);
      }
    );
  };

  $scope.deleteFriend = function(friendId) {
    friendService.deleteFriend($scope.myProfile._id, friendId)
    .this(
      function(response) {
        console.log(response);
        $scope.checkForProfile();
      },
      function(response) {
        console.log(response);
      }
    );
  };
});
