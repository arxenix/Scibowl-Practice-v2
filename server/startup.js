/**
 * Created by Ankur on 2/8/2016.
 */

if(Questions.find({}).count()===0) {
    console.log("Questions collection is empty! Loading contents from json...");
    //load js file into questions
    var json = JSON.parse(Assets.getText("questions.json"));
    json.questions.forEach(function(q){
        try{
            Questions.insert(q);
        }
        catch(err){
            console.log(q);
            console.log(err);
            //throw err;
        }
    });

    console.log("Inserted "+Questions.find({}).count()+" questions");
}