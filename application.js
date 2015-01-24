Items = new Mongo.Collection("items");


Meteor.methods({
	removeCompleted: function(){ Items.remove({checked: true, owner: Meteor.userId()}); },
	allCompleted: function(){ Items.update({checked:false, owner: Meteor.userId()}, {$set: {checked: true}}, {multi: true}); },
	updateItem: function (id, checked) {Items.update(id, {$set: {checked: checked}})},
	removeItem: function (id) {Items.remove(id)},
	addItem: function(text){ Items.insert({text: text, createdAt: new Date(), checked: false, owner: Meteor.userId()});}
});





