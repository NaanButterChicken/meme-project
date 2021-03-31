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
 
function getRandomIndex(length) {
//length is the number of results in memeStore
  var randInt = Math.random()

  Math.floor(randInt*length)
}

module.exports = {

  /*getTopMeme: function() {
    con.query("SELECT url FROM memeStore;", 
    function (err, result, fields) {
        if (err) throw err;
    
        //for(var n=0; n < result.length; n++) {
        //  console.log(result[n]);
        //}

        var index = getRandomIndex(result.length)
        return(result[index].url)
    });  
  },*/
  

  

  insertMeme: function (url) {
    console.log("trying to insert: " + url);
    con.query("INSERT INTO yelp.memeStore VALUES ( null, " + url +" )", 
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


  getTopMeme: async function(){
    return new Promise( resolve => {
      con.query("SELECT url FROM memeStore;",
      function (err, result, fields) {
        if (err) throw err;

        var index = getRandomIndex(result.length);
        //console.log(result[0].url);

        var res = result[index]["url"];

        //for(var n=0; n < fields.length; n++) {
        //  console.log(fields[n]);
        //}

        console.log(res);
        resolve(res);
        //resolve(result[index]["url"]);
      })
    })
  }

};









































































































































































































































































































































































































































//yahaha you found me