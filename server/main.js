import { Meteor } from 'meteor/meteor';

//this collection instantiation is here to allow this app to communicate with MongoDB
Links = new Mongo.Collection('links');
Meteor.startup(() => {
    
});
