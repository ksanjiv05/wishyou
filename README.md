const mongoose = require("mongoose");

const userCardSchema = mongoose.Schema({
uid: {
//user id of sender(wisher)
type: String,
required: true,
},
tag: {
type: String,
},
title: {
type: String,
required: true,
},
text: {
type: String,
required: true,
},
tagline: {
type: String,
required: true,
},
wishYou: {
//user id of reciver
type: String,
required: true,
},
background: {
type: String,
required: true,
},
format: {
taglineFormat: {
bold: {
type: Boolean,
default: false,
},
color: {
type: String,
default: "none",
},
fontFamily: {
type: String,
default: "none",
},
fontSize: {
type: Number,
default: 15,
},
textAlign: {
type: String,
default: "default",
},
},
textFormat: {
bold: {
type: Boolean,
default: false,
},
color: {
type: String,
default: "none",
},
fontFamily: {
type: String,
default: "none",
},
fontSize: {
type: Number,
default: 15,
},
textAlign: {
type: String,
default: "default",
},
},
titleFormat: {
bold: {
type: Boolean,
default: false,
},
color: {
type: String,
default: "none",
},
fontFamily: {
type: String,
default: "none",
},
fontSize: {
type: Number,
default: 15,
},
textAlign: {
type: String,
default: "default",
},
},
},
position: {
tagline: {
x: {
type: Number,
default: 0,
},
y: {
type: Number,
default: 0,
},
},
titleline: {
x: {
type: Number,
default: 0,
},
y: {
type: Number,
default: 0,
},
},
textline: {
x: {
type: Number,
default: 0,
},
y: {
type: Number,
default: 0,
},
},
},
createdAt: {
type: Date,
default: Date.now,
},
});

module.exports = mongoose.model("UserCard", userCardSchema);
// email, uid, pic, name, accessArrayIds;

bYM4Oq95cnz8ZWnI
