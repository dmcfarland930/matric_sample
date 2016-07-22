import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

//use iron router to link to home page view
Router.route('/', {
    template: 'home'
});

//use  iron router to link to show page view
Router.route('/show');

//create a collection containing links from MongoDB
Links = new Mongo.Collection('links');

//helper to return links found in MongoDB
Template.show.helpers({
    links: function(){
        return Links.find();
    }
});

//event to submit link info from form
Template.home.events({
   'submit .linkForm': function(event) {
       
       //variables set to form input
       var title = event.target.title.value;
       var url = event.target.url.value;
       var desc = event.target.desc.value;
       
       //inserting link input into Links collection
       Links.insert({
           title: title,
           url: url,
           desc: desc,
           createdOn: new Date()
       })
       
       //reset form values to blank
       event.target.title.value="";
       event.target.url.value="";
       event.target.desc.value="";
       alert("Link Saved!");
       return false;
   } 
});

//when link form is rendered, this will allow validation
Template.linkForm.onRendered(function(){
    $('.linkForm').validate();
});

//event to remove unwanted links from MongoDB
Template.link.events({
    'click .delete': function() {
        Links.remove(this._id);
    }
});