Items = new Mongo.Collection("items");


Meteor.methods({
	removeCompleted: function(){ Items.update({checked: true, owner: Meteor.userId(), archived: {$ne: true}}, {$set: {archived: true}}, {multi: true}); },
	allCompleted: function(){ Items.update({checked:false, owner: Meteor.userId()}, {$set: {checked: true}}, {multi: true}); },
	updateItem: function (id, checked) {Items.update(id, {$set: {checked: checked}})},
	removeItem: function (id) {Items.update({id: id}, {$set: {archived: true}})},
	addItem: function(text){ Items.insert({text: text, createdAt: new Date(), checked: false, owner: Meteor.userId(), archived: false});}
});





