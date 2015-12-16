angular.module('devMtIn').service('profileService', function() {
  this.serviceTest = function() {
    console.log('Profile service is connected!');
  };

  this.saveProfile = function(profileObj) {
    localStorage.setItem('profile', JSON.stringify(profileObj));
    console.log(localStorage.profile);
  };

  this.checkForProfile = function() {
    if (localStorage.profile) {
      return JSON.parse(localStorage.profile);
    }
    return {
      friends: [{name: 'Ryan'}, {name: 'Bryan'}, {name: 'Sarah'}, {name: 'Zac'}, {name: 'Erin'}] 
    }
  };

  this.deleteProfile = function() {
    delete localStorage.profile;
  };
});
