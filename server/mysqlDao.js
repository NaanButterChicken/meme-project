var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "sqluserpw",
  database: "yelp"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var createTable = "CREATE TABLE IF NOT EXISTS memeStore (id INT, url VARCHAR(1024));"; //later we can add categoryId, filename, blob and so on
  con.query(createTable, function (err, result) {
    if (err) throw err;
    console.log("would you like to play a game? (table created)");
  });
});

module.exports = {
  /* --this one isnt needed yet (probably)

  getAllRatings: function() {
    con.query("SELECT ratee, stars, comment FROM rating;", 
    function (err, result, fields) {
        if (err) throw err;

      // TODO: This for loop will print your resultSet to the console.\
      // Instead, could you put them into a single string, and return that, 
      // so that the route handler can pass it back to your browser?       
        for(var n=0; n < result.length; n++) {
          console.log(result[n]);
        }
    });  
  },
  
  */

  //ORIGINAL insertRating DONT CHANGE THIS MAKE A COPY
  insertRating: function (ratee, stars, comment) {
    con.query("INSERT INTO rating VALUES ( ? )", [[ratee, stars, comment]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 insertRating record inserted");
    });    
  },
  
  //insertMeme HERE
  insertMeme: function (id, url) {
    con.query("INSERT INTO memeStore VALUES ( ? )", [[id, url]], 
    function (err, result) {
        if (err) throw err;
        console.log("1 insertMeme record inserted");
    });    
  },

 /*
  //pull the urls out of the database
  getTopMeme: function () {
    var urlList= con.query("SELECT url FROM memeStore");
    console.log(urlList);
    function (err, result) {
        if (err) throw err;
        console.log(urlList);
   });    
  }
*/

  //this does something async
  getTopMeme: async function(){
    return new Promise( resolve => {
      con.query("SELECT url FROM memeStore;",
      function (err, result, fields) {
        if (err) throw err;

        var i = getRandomIndex(result.length);
        //console.log(result[0].url);

        resolve(result[i].url);
      })
    })
  }

};









































































































































































































































































































































































































































//yahaha you found me