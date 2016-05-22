Template.login.events({
  'click #logout-button': function() {
    Meteor.logout();
  }
});

Template.login.service = function()
{
    //returns an array like [{name: 'facebook'}];
    return getLoginServices();
}