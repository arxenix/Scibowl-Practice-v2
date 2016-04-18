/**
 * Created by Ankur on 2/8/2016.
 */

Meteor.methods({
    'getQuestion': function(filters) {
        var arr = Questions.find({category: {$in: filters.categories}, type: {$in: filters.types}, level: {$in: filters.levels}}).fetch();
        if(arr && arr.length>0) {
            return arr[Math.floor(Math.random() * arr.length)];
        }
        else return null;
    }
});