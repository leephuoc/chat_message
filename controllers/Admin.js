var BaseController = require('./Base'),
    fs = require('fs');
var user_model = require('../models/Users');

module.exports = BaseController.extend({

    /**
     * Authentication
     *
     * @param res
     * @param req
     * @param next
     */
    login: function(req, res) {
        var sync = true;

        if(req.method == 'POST') {
            var data_users = [];

            // Get data of user
            user_model.find({username: req.body.username}, function(err, users) {
                if(err) throw err;

                sync = false;
                data_users = users;
            });

            // Synchronous Programming
            while(sync) {
                require('deasync').sleep(100);
            }

            var flag = false;
            data_users.forEach(function(user) {
                if(user.password == req.body.password) {
                    flag = true;
                }
            });

            if(flag == true) {
                res.redirect('/');
                return;
            }
        }
        return res.render('admin/login.html', {title: 'new demo'});
    }
});