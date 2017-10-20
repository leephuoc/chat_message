var express = require('express'),
 app = express(),
 http = require('http').Server(app),
 io = require('socket.io')(http),
 path = require('path'),
 bodyParser = require('body-parser'),
 mongoose = require('mongoose');

/** Assign Controller */
var Admin = require('./controllers/Admin');

/** Create Application for form-urlencoded parser */
var urlencodedParser = bodyParser.urlencoded({extended: false});

/** Configure APP */
var engines = require('consolidate');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.use(express.static('public/bootstrap-4.0.0-alpha.6-dist'));

// Connect to MongoDB
var url = "mongodb://localhost:27017/chat";
mongoose.Promise = global.Promise;
mongoose.connect(url, { useMongoClient: true });
    console.log("Database created!");

    app.all('/admin', urlencodedParser,function(req, res) {
        return Admin.login(req, res);
    });

    app.all('/admin/dashboard', function(req, res) {
        console.log('OK');
        return res.render('admin/dashboard.html', {});
    });

    app.all('/admin/chat/room', function(req, res) {
        console.log('OK');
        return res.render('index.html', {});
    });




    /*
        var client = 0;
        var roomno = 1;
        var data_usernames = [];
        var data_contents = [];
        io.on('connection', function(socket) {
            // homepage.controller();

            // listen event set username
            socket.on('setUser', function(data) {
                console.log(data);
                console.log(data.username);
                if(data_usernames.indexOf(data.username) > -1) {
                    // console.log(data_usernames);
                    socket.emit('userExist', 'This username have person register !');
                } else {
                    data_usernames.push(data.username);
                    socket.emit('show', {username: data.username});
                }
            });

            // Listen event set
            socket.on('setContentChat', function(data) {
                data_contents.push(data.content);
                socket.broadcast.emit('loadChat', {contents: data_contents});
                socket.emit('loadChat', {contents: data_contents});

                console.log(data_contents);
            });
        });

    */

// Listen server
http.listen(3000, function() {
    console.log('Listening on post *:3000');
});