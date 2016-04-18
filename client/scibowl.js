/**
 * Created by Ankur on 2/10/2016.
 */
Template.body.helpers({
    'currentQuestion': function() {
        return Session.get('currentQuestion');
    },
    'questionDisplayed': function() {
        return Session.get('questionDisplayed');
    },
    'toLower': function(str) {
        return str.toLowerCase();
    },
    'timePercent': function() {
        var pct = 100-Session.get('timePercent');
        if(pct>=0) return pct;
        else return 0;
    }
});

var filter = {
    categories: [],
    types: [],
    levels: []
};

Meteor.startup(function() {
    Session.set('currentQuestion', null);
    Session.set('questionDisplayed', false);
    Session.set('timePercent', 0);
});

setInterval(function() {
    var startTime = Session.get('timerStart');
    var currentQuestion = Session.get('currentQuestion');
    if(currentQuestion && startTime) {
        var millis = new Date().getTime()-startTime;
        if(currentQuestion.bonus)
            Session.set('timePercent', millis/200);
        else Session.set('timePercent', millis/50);
    }
}, 50);

Template.body.events({
    'click #question-timer': function() {
        if(Session.get('currentQuestion')) {
            Session.set('timerStart', new Date().getTime());
        }
    },
    'click #question-back': function() {
        Session.set('questionDisplayed', true);
    },
    'click #question-btn': function() {
        if(!Session.get('questionDisplayed')) {
            console.log("fetching question");
            Meteor.call('getQuestion', filter, function(err,data) {
                if(!err) {
                    Session.set('currentQuestion', data);
                    Session.set('timerStart', null);
                    Session.set('timePercent', 0);
                }
                else console.log(err);
            });
        }
        Session.set('questionDisplayed', !Session.get('questionDisplayed'));
    },
    'click #categories > a': function(e) {
        var t = $(e.currentTarget);
        var cats = [t.data('category')];
        //handle alternate names
        if(cats[0]==="EARTH SCIENCE") {
            cats.push("ASTRONOMY");
            cats.push("EARTH AND SPACE")
        }
        else if(cats[0]==="PHYSICS") {
            cats.push("PHYSICAL SCIENCE");
        }
        else if(cats[0]==="BIOLOGY") {
            cats.push("LIFE SCIENCE");
        }
        else if(cats[0]==="MATH") {
            cats.push("MATHEMATICS");
        }
        else if(cats[0]==="GENERAL SCIENCE") {
            cats.push(null);
        }
        t.toggleClass("active");

        cats.forEach(function(cat){
            var idx = filter.categories.indexOf(cat);
            if (idx > -1)
                filter.categories.splice(idx, 1);
            else filter.categories.push(cat);
        });
    },
    'click #types > a': function(e) {
        var t = $(e.currentTarget);
        var type = t.data('type');
        console.log("clicked type: "+type);
        t.toggleClass("active");
        var idx = filter.types.indexOf(type);
        if (idx > -1)
            filter.types.splice(idx, 1);
        else filter.types.push(type);
    },
    'click #difficulties > a': function(e) {
        var t = $(e.currentTarget);
        var level = t.data('difficulty');
        console.log("clicked difficulty: "+level);
        t.toggleClass("active");
        var idx = filter.levels.indexOf(level);
        if (idx > -1)
            filter.levels.splice(idx, 1);
        else filter.levels.push(level);
    }
});