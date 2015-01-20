Items = new Mongo.Collection("items");

Meteor.methods({
	removeCompleted: function(){ Items.remove({checked: true, owner: Meteor.userId()}); },
	allCompleted: function(){ Items.update({checked:false, owner: Meteor.userId()}, {$set: {checked: true}}, {multi: true}); }
	});

if (Meteor.isClient) {
	Session.set("hide-completed", false);
  Template.body.helpers({
    items_completed: function(){
    	return Items.find({checked: true, owner: Meteor.userId()}, {sort: {createdAt: -1}});
    },
    items_uncompleted: function(){
    	if(!Meteor.user()){return Items.find({owner: '-1'})}
    	return Items.find({checked: false, owner: Meteor.userId()}, {sort: {createdAt: -1}});
    },
    items_uncompleted_count: function(){return Items.find({checked: false, owner: Meteor.userId()}).count()},
    items_uncompleted_count_is_not_zero: function(){if(!Meteor.user()){return false;} return Items.find({checked: false, owner: Meteor.userId()}).count() != 0},
    show_completed: function(){return !Session.get("hide-completed") }
  });

  Template.body.events({
    "submit .new-item" : function(e) {
    	Items.insert({text: e.target.text.value, createdAt: new Date(), checked: false, owner: Meteor.userId()});
    	e.target.text.value = "";
    	return false;
    },
    
    "click .clear-completed" : function(e){
    	Meteor.call('removeCompleted');
    },
    
    "click .all-completed" : function(e){
    	Meteor.call('allCompleted');
    },
    
    "click .settings" : function(e){
    	$('.settings-panel').toggleClass('hidden');
    },
    
    "click .close-settings" : function(e){
    	$('.settings-panel').toggleClass('hidden');
    },
    
    "change #hide-complete-toggle" : function(e){
    	Session.set("hide-completed", e.target.checked);
    	console.log(e.target.checked);
    }
  });
  
  Template.item.events({
  	"click .toggle-checked" : function () {Items.update(this._id, {$set: {checked: !this.checked}})},
  	"click .delete" : function () {Items.remove(this._id)}
  });
}

