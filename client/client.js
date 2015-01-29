if (Meteor.isClient) {
	Meteor.subscribe("items");
  Session.set("hide-completed", false);	
  Template.items_view.helpers({
    items_completed: function(){return Items.find({checked: true, owner: Meteor.userId(), archived: {$ne: true}}, {sort: {createdAt: -1}});},
    items_uncompleted: function(){return Items.find({checked: false, owner: Meteor.userId(), archived: {$ne: true}}, {sort: {createdAt: -1}});},
    items_archived: function(){return Items.find({owner: Meteor.userId(), archived: true});},
    items_uncompleted_count: function(){return Items.find({checked: false, owner: Meteor.userId(), archived: {$ne: true}}).count()},
    items_uncompleted_count_is_not_zero: function(){Items.find({checked: false, owner: Meteor.userId(), archived: {$ne: true}}).count() != 0},
    show_completed: function(){return !Session.get("hide-completed") }
  });
  
  Template.archived_view.helpers({
    items_archived: function(){return Items.find({owner: Meteor.userId(), archived: true});}
  });

  Template.items_view.events({
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
    }
  });
  
  
  Template.settings_view.events({
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
   Template.item_archived.events({
  	"click .unarchive" : function(){Meteor.call("unarchiveItem", this._id)}
  });
}