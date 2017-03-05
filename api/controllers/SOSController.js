/**
 * SOSController
 *
 * @description :: Server-side logic for managing SOS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request');
var t1,u1,ds;
var t2,u2,du;
var valuessos;
var valuesuser;
var valuesdsos, valuesduser;
module.exports = {

  'new' : function (req, res) {
    res.view();
  },

  create : function(req, res, next) {
    console.log("Entered into user controller");

    // if (!req.param('email') || !req.param('latitude') || !req.param('longitude') || !req.param('time') || !req.param('date')) {
    //   var fieldsRequiredError = {
    //     name: 'usernamePasswordRequired',
    //     message: 'You must enter fields properly.'
    //   };
    //
    //   console.log('Fields enter required ');
    //
    //   req.session.flash = {
    //     err1: fieldsRequiredError,
    //   };
    //   res.status(200).json(fieldsRequiredError);
    //   return
    // }



    SOS.create(req.params.all(), function sosCreated(err, sos) {

      if (sos) {
        var thankyou = [{
          name: 'usernamePasswordRequired',
          message: 'Thankyou.'
        }];

        console.log('Thankyou');
        req.session.flash = {
          err2: thankyou,
        };

        sos.latitude = sos.latitude + 100.00;
        console.log(sos.latitude);

        User.find(function foundUsers(err, users){
          if(err) return next(err);
          //console.log(users);
          //res.status(200).json(users);


          users.forEach(function(user) {
            //console.log(user);
            console.log("worked");
            valuessos = (sos.time).split(":");
            valuesuser = (user.time).split(":");
            valuesdsos = (sos.date).split("-");
            valuesduser = (user.date).split("-");


            t1 = parseFloat(valuessos[0]);
            t2 = parseFloat(valuessos[1]);
            u1 = parseFloat(valuesuser[0]);
            u2 = parseFloat(valuesuser[1]);
            ds = parseFloat(valuesdsos[2]);
            du = parseFloat(valuesduser[2]);
            console.log("u2-15 is ",u2-15);
            console.log("t2 is ",t2);
            console.log("u2+15 is ",u2+15);

            //if(du == ds){
            //if(u2-10 < t2 && t2 < u2 + 10) {
              console.log("t2 is greater than u2-15");
              if ((user.longitude - 5.0 < sos.longitude && user.longitude + 5.0) && (user.latitude - 5 < sos.latitude < user.latitude + 5)) {
                console.log("help needed");
                res.status(200).json(user);

                //Mailer.sendWelcomeMail(user);
              }
            //}

            //}
            else {
              console.log("No help needed");
              res.status(200).json(users);
            }

          });


        });

        //Mailer.sendWelcomeMail(user);
        //console.log('Entered into SOS controller');

        //res.status(200).json(sos);

        // res.redirect('/user/new');
        return;
      }
    });
  },


  match: function(req, res, next) {

    SOS.findOne(req.param('id'), function foundSOS(err, sos) {
      if (err) return next(err);
      if (!sos) return next();

      User.find(function foundUsers(err, users){
        if(err) return next(err);
        console.log(users);
        //res.status(200).json(users);

        users.forEach(function(user) {
          console.log(user);
          console.log("worked");
          if (user.longitude === sos.longitude) {
            console.log("inside if");
            Mailer.sendWelcomeMail(user);
          }
        });
        res.status(200).json(users);


      });


      //res.status(200).json(sos);
    });

    // User.findOrCreate(users).exec(function(err, users){
    //   console.log(users);
    // });



  },

  index : function(req, res, next){

    SOS.find(function foundSOSs(err, soss){
      if(err) return next(err);
      res.status(200).json(soss);

    });
  },





};

