const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
const { response } = require('express');
//const dao = require('.sqliteDao.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/admin', (req, res)  => {
    res.status(200).sendFile('admin.html', {
        root: path.resolve('../public')
    });
})

//ignore insertRating i dont think its needed atm
app.get('/insertRating', (request, response)  => {
    
    var ratee = request.query.ratee;
    var stars = request.query.stars;
    var comment = request.query.comment;
    
    dao.insertRating(ratee, stars, comment);

    response.status(200).send( {});
})

app.get('/whatsBetter', (request, response)  => {
    
    var coinFlip = Math.random();
    if (coinFlip > .5) {
        response.status(200).send("<img src='https://prods3.imgix.net/images/articles/2017_05/Facebook-hawaiian-pizza-origins.jpg' alt='pineapple'> ");
    } else {
        response.status(200).send("<img src='https://bakerbynature.com/wp-content/uploads/2014/05/IMG_4645-682x1024.jpg' alt='the boring answer'> ");
    }
    //https://prods3.imgix.net/images/articles/2017_05/Facebook-hawaiian-pizza-origins.jpg **actually this is a pretty epic picture and now i want pizza
})

app.get('/insertMeme', (request, response) => {
    dao.insertMeme(request.query.filepath);
    response.status(200).send( {});
})

/* this is troublesome
app.get('/getTopMeme', (request, response) => {
    dao.getTopMeme(request.query.filepath);
    response.status(200).send( {});
})
*/

app.get('/getTopMeme', async (request, response) => { //(request , response) and everything might not be accurate
    var url = await dao.getTopMeme //there might be more here
    console.log('grabbing it...')//more?
    response.status(200).send( {}); //more- maybe not tho *shrugs*
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
