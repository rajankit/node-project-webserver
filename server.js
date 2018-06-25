const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials' );
app.set(('view engine', 'hbs'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log + '\n', (err) =>{
        if(err){
            console.log('Unable to append the log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

app.get('/',(request, response) => {
    //response.send('<h1>Hello Express!</h1>');
    response.render('home.hbs',{
        pageTitle: 'Home Page',
        pageContent : 'Welcome to Home Page'
    });
});

app.get('/about',(req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error : 'Unable To Handle request'
    });
});
app.listen(3000, () => {
    console.log('Server is on the port 3000');
});