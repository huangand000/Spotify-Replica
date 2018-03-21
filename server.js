const express = require('express');
var app = express();
const session = require('express-session');
app.use(session({secret: 'codingdojo'}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviewerdb');
mongoose.Promise = global.Promise
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + '/reviewer-app/dist'));
var path = require('path');

var Schema = mongoose.Schema;
var UserSchema = mongoose.Schema({
    email: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    password: {
        type: String,
    },
    playlists: [{type: Schema.Types.ObjectId, ref: 'Playlist'}],
}, {timestamps: true})

var PlaylistSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    listName: {type: String},
    user_name: {type: String},
    comments: [{comment: '', rating: '', user_name: ''}],
    songs: [{id: '', name: '', artist: '', album: ''}]
})

var SongSchema = new mongoose.Schema({
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    user_name: {type: String},
    artist: {type: String},
    name: {type: String},
    album: {type: String}
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User')

mongoose.model('Playlist', PlaylistSchema);
var Playlist = mongoose.model('Playlist')

mongoose.model('Song', SongSchema);
var Song = mongoose.model('Song')


app.post('/register', function(req, res) {
    console.log(req.body)
   if(req.body.password != req.body.passwordConfirm) {
       res.json({message: "Error", error: "Password must match"})
   } else {
       User.create(req.body, function(err) {
           if (err) {
               res.json({message: "Error", error: err})
           } else {
                User.find({}, function(err, users) {
                    res.json(users)
                })
           }
       })
   }
})

app.post('/login', function(req, res) {
    User.find({email: req.body.email}, function(err, user) {
        console.log("user", user[0])
        console.log(err)
        if (err) {
            res.json({message: "Error", error: err})
        } else if (user[0] == null) {
            res.json({message: "Error", error: 'No email found'})
        } else if (req.body.password != user[0].password) {
            res.json({message: "Error", error: "Email and Password Mismatch"})
        } else {
            req.session.user_id = user[0]._id;
            req.session.user_name = user[0].first_name
            console.log(req.session)
            res.json({message: 'Success', user: user})
        }
    })
})

app.post('/addSong', function(req, res) {
    console.log(req.body)
    var song = new Song(req.body);
    song.user_name = req.session.user_name
    console.log(req.session.user_name)
    song.save(function(err) {
        if (err) {
            res.json({message: "Error", error: "Email and Password Mismatch"})
        } else {
            res.json({message: 'Success'})
        }
    })
})

app.get('/songs', function(req, res) {
    Song.find({}, function(err, songs) {
        if (err) {
            res.json({message: 'Error', error: err})
        } else {
            res.json(songs)
        }
    })
})

app.post('/addComment', function(req, res) {
    Playlist.findById(req.body.id, function(err, playlist) {
        playlist.comments.push({comment: req.body.comment, rating: req.body.rating, user_name: playlist.user_name})
        playlist.save(function(err) {
            if (err) {
                res.json({message: 'Error', error: err})
            } else {
                res.json({message: 'Success'})
            }
        })
    })
})

app.post('/createPlaylist', function(req, res) {
    console.log('req',req.body)
    var playlist = new Playlist();
    playlist.songs = req.body;
    playlist.user_name = req.session.user_name;
    playlist.listName = req.body[0].listName
    console.log(req.body[0].listName)
    console.log(playlist.listname)
    console.log('playlists', playlist.songs)
    playlist.save(function(err) {
        if (err) {
            res.json({message: 'Error', error: err})
        } else {
            res.json({message: 'Success'})
        }
    })
})

app.get('/playlist', function(req, res) {
    Playlist.find({}, function(err, playlists) {
        if (err) {
            res.json({message: 'Error', error: err})
        } else {
            res.json(playlists)
        }
    })
})

app.post('/playlist/:id', function(req, res) {
    console.log(req.body.id)
    Playlist.findById(req.body.id, function(err, playlist) {
        if (err) {
            res.json({message: 'Error', error: err})
        } else {
            res.json(playlist)
        }
    })
})

app.get('/logoff', function(req, res) {
    req.session.destroy();
    res.json({message:'Logged Out'})
})

app.listen(8000, function() {
    console.log("Listening on port 8000")
})