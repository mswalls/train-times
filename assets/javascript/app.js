$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyA2xqRTLo6X5Ct1YdlTbdVtrodg8seEdMc",
        authDomain: "train-timers-843b5.firebaseapp.com",
        databaseURL: "https://train-timers-843b5.firebaseio.com",
        projectId: "train-timers-843b5",
        storageBucket: "train-timers-843b5.appspot.com",
        messagingSenderId: "364856094709"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function (event) {
        event.preventDefault();

        var name = $("#train-name-input").val().trim();
        var dest = $("#train-dest-input").val().trim();
        var time = $("#train-time-input").val().trim();
        var freq = $("#train-freq-input").val().trim();

        var newTrain = {
            name: name,
            dest: dest,
            time: time,
            freq: freq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(newTrain);

        $("#train-name-input").val("");
        $("#train-dest-input").val("");
        $("#train-time-input").val("");
        $("#train-freq-input").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        var name = childSnapshot.val().name;
        var dest = childSnapshot.val().dest;
        var time = childSnapshot.val().time;
        var freq = childSnapshot.val().freq;

        var currentTime = moment();

        var timeconverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, "years");
        var trainTime = moment(timeconverted).format("HH:mm");

        var ctime = moment(trainTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(ctime), "minutes");

        var tremaining = diffTime % freq;
        var minsAway = freq - tremaining;
        var nextTrain = moment().add(minsAway, "minutes");

        $('#currenttime').text(currentTime);
        $('#train-table').append(
            "<tr><td id='name'>" + name +
            "</td><td id='dest'>" + dest +
            "</td><td id='freq'>" + freq +
            "</td><td id='next'>" + moment(nextTrain).format("HH:mm") +
            "</td><td id='away'>" + minsAway + ' minutes' + "</td></tr>");
    },

    );
});




