module.exports = function(app, passport, db, ObjectId) {
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================

  //there should be one get fro the same page, list of users being rendered is the one that needs to be manipulated
  app.get('/profile', isLoggedIn, function(req, res) {
    //  Leon's Username material
    var uId = ObjectId(req.session.passport.user) //error
    var uName
    db.collection('users').find({
      "_id": uId
    }).toArray((err, result) => {
      console.log('THIS IS SPARTAAAAAAAAGSGAGGGAG', uId, result[0])
      if (err) return console.log(err)
      uName = result[0].local.username //herererererpasta current change
      db.collection('messages').find({
        'username': result[0].local.username
      }).toArray((err, messages) => {
        console.log(uName, "The Rat Eats Cake");
        if (err) return console.log(err)
        //always check what is being passed
        res.render('profile.ejs', {
          user: req.user,
          messages: messages,
          bio: req.bio
        })
      })
    });
  });

  //SYNTAX ERRORRRRRRRR AAAAAHAHAHAHAHHAHA

  app.get('/profile/:username', isLoggedIn, function(req, res) { //to create a new get for specific user bein viewed by main viewer
    //  Leon's Username material

    db.collection('users').find({
      "username": req.params.username
    }).toArray((err, result) => {

      if (err) return console.log(err)

      db.collection('messages').find({
        username: req.body.local.username
      }).toArray((err, messages) => {
        if (err) return console.log(err) //always check what is being passed
        console.log(messages, "HEY HEY YOU YOU", messages)
        res.render('profile.ejs', {
          user: req.user,
          messages: messages,
          bio: req.bio
        })
      })
    });
  });


  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //Maps ROUTES ================================================================

  app.get('/maps', isLoggedIn, function(req, res) {
    console.log(req.session, "HumDiddly Dum Dum"); //params is an empty object {}
    var uId = ObjectId(req.session.passport.user)

    db.collection('messages').find({ //took out id only looking for 1 id
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            // Replace hardcoded coordinates for actual req.location
            //get user id of current user and submit their coordinates to the dom
            //????? should the coordinates her be of the user or the coordinates that are being retrieved
            coordinates: [42.3582, -71.0590]
          }
        }
      }
    }).toArray((err, messages) => { // put mongodb results into an array called messagesData
      if (err) return console.log(err);
      console.log('LOOOOOOKKKK', messages)

      const mapResults = {
        "type": "FeatureCollection",
        "features": []
      };
      //loop through each message in the messagesData array and create an object which will be pushed into the features array inside mapResults
      messages.forEach(md => {
        //  console.log("MD:", md.quote, md.name, "longitude:", md.location.coordinates[0], "latitue:", md.location.coordinates[1]);
        //  console.log(mapResults.geometry)//Correct in terminal
        mapResults.features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [ md.location.coordinates[0], md.location.coordinates[1] ]
          },
          "properties": {
            "message": md.quote,
            "who"   : md.username //here
            //"who": md.name,
            //"location": md.location.coordinates //why arent you working?
          }
        });
      })
      console.log(mapResults, "GAFAGAGHGH")
      console.log(mapResults, messages, " LOOOOOKK ATATATATAT EEMEMEMEME IM MISTER ME SEEEEEKKKSS")
      console.log(mapResults, "It is I the") //HERE
      res.render('maps.ejs', {
        features: mapResults.features,
        geometry: mapResults.geometry,
        mapResults: mapResults
      }) //HERE

      res.end();

    })
  }) //here


  app.get('/mapsdata', isLoggedIn, function(req, res) {
    console.log(req.session, "HumDiddly Dum Dum"); //params is an empty object {}
    var uId = ObjectId(req.session.passport.user)

    db.collection('messages').find({ //took out id only looking for 1 id
      location: {
        $near: {
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            // Replace hardcoded coordinates for actual req.location
            //get user id of current user and submit their coordinates to the dom
            //????? should the coordinates her be of the user or the coordinates that are being retrieved
            coordinates: [42.3582, -71.0590]
          }
        }
      }
    }).toArray((err, messages) => { // put mongodb results into an array called messagesData
      if (err) return console.log(err);
      console.log('LOOOOOOKKKK', messages)

      const mapResults = {
        "type": "FeatureCollection",
        "features": []
      };
      //loop through each message in the messagesData array and create an object which will be pushed into the features array inside mapResults
      messages.forEach(md => {
        //  console.log("MD:", md.quote, md.name, "longitude:", md.location.coordinates[0], "latitue:", md.location.coordinates[1]);
        //  console.log(mapResults.geometry)//Correct in terminal
        mapResults.features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [md.location.coordinates[1], md.location.coordinates[0]]
          },
          "properties": {
            "message": md.quote,
          //  "who": md.name,
          //  "location": md.location.coordinates //why arent you working?
          }
        });
      })
      console.log(mapResults, "GAFAGAGHGH")
      console.log(mapResults, messages, " LOOOOOKK ATATATATAT EEMEMEMEME IM MISTER ME SEEEEEKKKSS")
      console.log(mapResults, "It is I the") //HERE
      res.json(mapResults) //HERE
      //sends to fetch,converts to json
      res.end();

    })
    // })
  });


  //   app.post('/messages', isLoggedIn, (req, res) => {
  //     // TO-DO parse from string to stringify
  //     // if (req.body.bio !== undefined && req.body.name && req.body.quote){
  //     let location = JSON.parse(req.body.locate);
  //     //let location = JSON.parse(req.body.locate)
  //     var uId = ObjectId(req.session.passport.user)
  //     var uName
  //     db.collection('users').find({"_id": uId}).toArray((err, result) => {
  //       if (err) return console.log(err)
  //     db.collection('messages').save({
  //       bio: req.body.bio, //HERE HERE
  //       name: req.body.name,
  //       quote: req.body.quote,
  //       username: req.user.local.username,
  //       location: {
  //         type: "Point",
  //         coordinates: [location.lat, location.lon]
  //       },
  //       thumbUp: false
  //     }, (err, result) => {
  //       if (err) return console.log(err) //may be an error
  //       //console.log('saved to database', result)
  //       res.redirect('/profile')
  //     })
  //   })
  // })

//IMAGE CODE ==================================



  // Posting routes ===============================================================
  //KW Friday: changed post to help with geo location and message

  //TODO: Fixpost so that you can post both the location of the user wmith their username and be able to
  app.post('/messages', isLoggedIn, (req, res) => {
    // TO-DO parse from string to stringify
    // if (req.body.bio !== undefined && req.body.name && req.body.quote){
    let location = JSON.parse(req.body.locate);
    //let location = JSON.parse(req.body.locate)
    var uId = ObjectId(req.session.passport.user)
    var uName
    db.collection('users').find({
      "_id": uId
    }).toArray((err, result) => {
      if (err) return console.log(err)
      uName = result[0].local.username
      db.collection('messages').save({
        bio: req.body.bio, //HERE HERE
        name: req.body.name,
        quote: req.body.quote,
        username: uName,
        // uId     : req.session.passport.user //Here
        location: {
          type: "Point",
          coordinates: [location.lat, location.lon]
        },
        thumbUp: false,

      }, (err, result) => {
        if (err) return console.log(err) //may be an error
        //console.log('saved to database', result)
        res.redirect('/profile')
      })
    })
  })

  app.put('/messages', (req, res) => {

    db.collection('messages')
      .findOneAndUpdate({

        quote: req.body.quote //HERE HERE

      }, {
        $set: {
          isSelected: req.body.isSelected
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true //hwre
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/messages', (req, res) => {
    db.collection('messages').findOneAndDelete({
      name: req.body.name,
      quote: req.body.quote
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // TODO: Fix sign-up button not active
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });
  //KW change sign up to local - index also it seems that sign up is actually a class name like in our activity today...
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });
};





// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
