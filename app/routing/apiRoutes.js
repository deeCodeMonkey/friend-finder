// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
        console.log(friends);
    });



    app.post("/api/friends", function (req, res) {
        // req.body is available since we're using the body-parser middleware
        //console.log('answer is this ' + JSON.stringify(req.body));
        var data = {
            name: req.body.name,
            photo: req.body.photo
        }
        var scores = JSON.parse(JSON.stringify(req.body).replace('scores[]', 'scores')).scores;
        data.scores = scores;
        console.log('score is this ' + JSON.stringify(scores));
        friends.push(data);
        console.log(friends);

        let smallestSum = 1000;
        let friendChosen;
        //determine match and return results with modal
        for (var i = 0; i < friends.length; i++) {
            let friend = friends[i];

            if (friend.name === req.body.name) {
                continue;
            }
            let sum = 0;
            for (var j = 0; j < scores.length; j++) {
                sum += Math.abs(friend.scores[j] - scores[j]);
            }
            if (sum < smallestSum) {
                smallestSum = sum;
                friendChosen = friend;
                console.log("chosen " + friendChosen.name);
            }
        }
        console.log(friendChosen);
        res.status(200).json(friendChosen);
    });

};
