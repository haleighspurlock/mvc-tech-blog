// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//association for User - has many Post and has many Comment

//association for Post - has many Comment and belongs to a User

//association for Comment - belongs to Post and User
