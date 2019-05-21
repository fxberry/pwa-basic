var express = require('express');
var cors = require('cors');
var app = express();

var originsWhitelist = [
  'http://localhost:8080',
  'http://localhost:8888',
  'http://127.0.0.1'
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  }
  //,credentials:true
}

//here is the magic
app.use(cors(corsOptions));

const webpush = require('web-push');
// var pushSubscription = null;
var pushSubscriptions = [];

const publicVapidKey = 'BL5nC-N8lmUe8dqnYtgqLFJWtNPt28A8Xp4oY3ka82QUY0H4Jx3kD_rRrvfK9QvC2Ig4KZVNI9kPBL3860GKAjg';
const privateVapidKey = 'TrIOE8w79VvFvSxx2eJSBWLW4atlElpGozln4UpjFJU';

webpush.setVapidDetails('mailto:fx.egli@gmail.com', publicVapidKey, privateVapidKey);

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  // pushSubscription = req.body;
  pushSubscriptions.push(req.body);
  res.status(201).json({});
  console.log('Push Subscription', req.body);
});

app.post('/unsubscribe', (req, res) => {
  // pushSubscription = req.body;
  pushSubscriptions = pushSubscriptions.filter(item => item !== req.body)
  res.status(201).json({});
  console.log('REMOVE Push Subscription', req.body);
});

app.post('/notifyme', (req, res) => {
  console.log('---');
  console.log(req.body.id);
  console.log(req.body.check);
  console.log('---');

  const payload = JSON.stringify({ notification:{
    'title': '2do PWA',
    'body': 'Something happened, do you like to update?',
    'icon': 'assets/icons/icon-128x128.png',
    'vibrate': [100, 50, 100],
    'data': {
       'name': 'felix',
   'checked': true,
   'lastModified': '2019-05-03T14:25:43.511Z'
    },
   'actions': [{
       'action': 'update',
       'title': 'Lets see what happened!'
    }]
  }
  });
  console.log(pushSubscriptions.toString());

  for (var key in pushSubscriptions) {
    webpush.sendNotification(pushSubscriptions[key], payload).catch(error => {
      console.error(error.stack);
    });
  }

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
