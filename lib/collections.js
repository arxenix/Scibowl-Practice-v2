/**
 * Created by Ankur on 2/8/2016.
 */

var Schemas = {};

Questions = new Meteor.Collection("questions");
Schemas.Question = new SimpleSchema({
    bonus: {
        type: Boolean,
        label: "Bonus Question"
    },
    round_name: {
        type: String,
        label: "Name of the Round"
    },
    set_name: {
        type: String,
        label: "Name of the Set"
    },
    category: {
        type: String,
        label: "Category"
    },
    parsed_answer: {
        type: String,
        label: "Answer",
        defaultValue: ""
    },
    num: {
        type: Number,
        label: "Index on Page",
        min: 0,
        optional: true
    },
    page: {
        type: Number,
        label: "Page Number",
        min: 1,
        optional: true
    },
    type: {
        type: String,
        label: "Question Type (MC/SA)",
        allowedValues: ["MC","SA"]
    },
    level: {
        type: String,
        label: "Level of Difficulty (MS/HS)",
        allowedValues: ["MS", "HS"]
    },
    question_image: {
        type: String,
        label: "Path to Question Image"
    },
    answer_image: {
        type: String,
        label: "Path to Answer Image"
    }
});
Questions.attachSchema(Schemas.Question);