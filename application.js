Items = new Mongo.Collection("items");


Meteor.methods({
	removeCompleted: function(){ Items.update({checked: true, owner: Meteor.userId(), archived: {$ne: true}}, {$set: {archived: true}}, {multi: true}); },
	allCompleted: function(){ Items.update({checked: false, owner: Meteor.userId()}, {$set: {checked: true}}, {multi: true}); },
	updateItem: function(id, checked) {Items.update(id, {$set: {checked: checked}})},
	removeItem: function(id) {Items.update(id, {$set: {archived: true}})},
	unarchiveItem: function(id) {Items.update(id, {$set: {archived: false}})},
	addItem: function(text){ Items.insert({text: text, createdAt: new Date(), checked: false, owner: Meteor.userId(), archived: false});}
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function(){
	this.render('items_view');
	document.title = 'Super ToDo';
});

Router.route('/archived', function(){
	this.render('archived_view');
	document.title = 'Archived Items';
});





