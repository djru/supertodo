Items = new Mongo.Collection("items");

Meteor.methods({
	removeCompleted: function(){ Items.remove({checked: true, owner: Meteor.userId()}); },
	allCompleted: function(){ Items.update({checked:false, owner: Meteor.userId()}, {$set: {checked: true}}, {multi: true}); },
	updateItem: function (id, checked) {Items.update(id, {$set: {checked: checked}})},
	removeItem: function (id) {Items.remove(id)},
	addItem: function(text){ Items.insert({text: text, createdAt: new Date(), checked: false, owner: Meteor.userId()});}
});

if (Meteor.isClient) {
	Meteor.subscribe("items");
	Session.set("hide-completed", false);
  Template.body.helpers({
    items_completed: function(){return Items.find({checked: true, owner: Meteor.userId()}, {sort: {createdAt: -1}});},
    items_uncompleted: function(){return Items.find({checked: false, owner: Meteor.userId()}, {sort: {createdAt: -1}});},
    items_uncompleted_count: function(){return Items.find({checked: false, owner: Meteor.userId()}).count()},
    items_uncompleted_count_is_not_zero: function(){Items.find({checked: false, owner: Meteor.userId()}).count() != 0},
    show_completed: function(){return !Session.get("hide-completed") }
  });

  Template.body.events({
    "submit .new-item" : function(e) {
    	Meteor.call("addItem", e.target.text.value)
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
  	"click .toggle-checked" : function(){Meteor.call("updateItem", this._id, !this.checked)},
  	"click .delete" : function(){Meteor.call("removeItem", this._id)}
  });
}

if (Meteor.isServer){
	Meteor.publish("items", function(){return Items.find({owner: this.userId})})
}

