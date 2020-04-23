const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
const users = require("./users.js");

const User = users.model;
const validUser = users.valid;

// A time-stamp will have a beginning and end time, a user, and a category
const timeStampSchema = new mongoose.Schema({
  beginTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  category: String,
});

const TimeStamp = mongoose.model('TimeStamp', timeStampSchema);

// create a new time-stamp 
router.post('/', validUser, async (req, res) => {
  const timeStamp = new TimeStamp({
    user: req.user,
    category: req.body.category,
  });
  try {
    await timeStamp.save();
    return res.send({
      timeStamp: timeStamp
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Add an end time to a time-stamp
router.put('/:id', validUser, async (req, res) => {
  try {
    timeStamp = await TimeStamp.findOne({
      _id: req.params.id
    });
    if(req.user !== timeStamp.user) {
      return res.sendStatus(403);
    }
    timeStamp.endTime = Date.now;
    await timeStamp.save();
    return res.send({
      timeStamp: timeStamp
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', validUser, async (req, res) => {
  try {
    timeStamp = await TimeStamp.findOne({
      _id: req.params.id
    });
    if(req.user !== timeStamp.user) {
      return res.sendStatus(403);
    }
    await TimeStamp.deleteOne({
      _id: req.params.id
    });
    return res.send({
      timeStamp: timeStamp
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router
}
