angular.module('devMtIn').service('friendService', function($http, $q) {

    var baseUrl = 'http://connections.devmounta.in/api/friends/';

    this.findFriends = function(userId, query) {
      var deferrer = $q.defer();
      $http({
        method: 'GET',
        url: baseUrl + userId + '?name=' + query
      })
      .then(
        function(response) {
          deferrer.resolve(response.data);
        },
        function(response) {
          deferrer.reject(response.status);
        }
      );

      return deferrer.promise;
    };

    this.addFriend = function(userId, friendId) {
      var deferrer = $q.defer();
      $http({
        method: 'PUT',
        url: baseUrl + userId,
        data: {
          'friendId': friendId
        }
      })
      .then(
        function(response) {
          deferrer.resolve(response.data);
        },
        function(response) {
          deferrer.reject(response.status);
        }
      );

      return deferrer.promise;
    };

    this.deleteFriend = function(userId, friendId) {
      var deferrer = $q.defer();
      $http({
        method: 'PUT',
        url: baseUrl + 'remove/' + userId,
        data: {
          friendId: friendId
        }
      })
      .then(
        function(response) {
          deferrer.resolve(response.data);
        },
        function(response) {
          deferrer.reject(response.data);
        }
      );
      return deferrer.promise;
    };

    this.findFriendsFriends = function(profile) {
      var deferrer = $q.defer(); // set up deferrer
      var index = 0; // start with first friend in your friends array
      function getNextFriend() {
        if (profile.friends[index]) { // if you have a friend at the index
          $http({ // get that friend's friends
            method: 'GET',
            url: 'http://connections.devmounta.in/api/friends-friends/' + profile.friends[index]._id
          })
          .then(
            function(friends) { // assign each of your friends friends to your friends (on your profile object)
              profile.friends[index].friends = friends;
              index++; // increment the index
              getNextFriend(); // repeat for next friend, until no friends left
            },
            function(err) {
              return console.error(err);
            }
          );
        } else { // when no friends left, resolve promise with profile object, return promise
          deferrer.resolve(profile);
          return deferrer.promise;
        }
      }

      getNextFriend(); // invoke inner function to get it started
    };
});
