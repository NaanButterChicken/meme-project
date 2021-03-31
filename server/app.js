const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
const { response } = require('express');
//const dao = require('.sqliteDao.js');

//var multer = require('multer');

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

//above is technical whatevers that make things work, the stuff below this is functions i need for stuff ... i think


app.get('/whatsBetter', (request, response)  => {
    
    var coinFlip = Math.random();
    if (coinFlip > .5) {
        response.status(200).send("<img src='https://prods3.imgix.net/images/articles/2017_05/Facebook-hawaiian-pizza-origins.jpg' alt='pineapple' width='20%'> ");
    } else {
        response.status(200).send("<img src='https://bakerbynature.com/wp-content/uploads/2014/05/IMG_4645-682x1024.jpg' alt='the boring answer' width='20%'> ");
    }
    //https://prods3.imgix.net/images/articles/2017_05/Facebook-hawaiian-pizza-origins.jpg **actually this is a pretty epic picture and now i want pizza
})

app.get('/insertMeme', (request, response) => {
    console.log("handler is trying to insert: " + request.query.filepath);
    
    dao.insertMeme(request.query.filepath);
    response.status(200).send( {});
})

//oh no oh mama i forgot to water my baguettes
//hydrate us ryan

app.get('/getTopMeme', async (request, response) => {
    console.log("waiting...")
    var url = await dao.getTopMeme();
    console.log(url); //eventually turn this into html somehow
    response.status(200).send(url);
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
