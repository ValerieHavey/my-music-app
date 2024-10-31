const express = require("express");
const router = express.Router();
const {Types:{ObjectId}} = require('mongoose');

const User = require("../models/user");

/*
Action: Index
Method: GET
Route: /users/:userId/music
Description: Show all of the music for a given user
*/
  
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('music/index.ejs', {
            music: currentUser.music,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

/*
Action: SHOW
Method: GET
Route: /users/:userId/music/musicId
Description: Show the details for a music entry
*/

router.get('/:musicId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const music = currentUser.music.id(req.params.musicId);

        res.render('music/show.ejs', {
            music: music,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

/*
Action: NEW
Method: GET
Route: /users/:userId/music/new
Description: Show form for creating a new music entry
*/

router.get('/new', async (req, res) => {
    res.render('music/new.ejs')
})


/*
Action: Create
Method: POST
Route: /users/:userId/music/
Description: Adds new music
*/

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.music.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/music`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})


/*
Action: Edit
Method: 
Route: 
Description: 
*/

router.get('/:musicId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const music = currentUser.applications.id(req.params.musicId);
  
      res.render('music/edit.ejs', {
        music: music,
      })
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


/*
Action: Update
Method: PUT
Route: /users/:userId/music/:musicId
Description: Updated edited song
*/

router.put('/:musicId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const music = currentUser.applications.id(req.params.musicId);
  
      music.set(req.body);
  
      await currentUser.save();
  
      res.redirect(`/users/${currentUser._id}/music/${req.params.musicId}`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


/*
Action:Delete
Method: Delete
Route: /users/:userId/music/:musicId
Description: Delete
*/

router.delete('/:musicId', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);
        currentUser.music.id(req.params,musicId).deleteOne();
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/music`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;