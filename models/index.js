// import models
const User = require('./User');
const Post = require('./Post');
// const Comment = require('./Comment');

//association for User - has many Post and has many Comment
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// User.hasMany(Comment, {
//     foreignKey: 'user_id',
// });

//association for Post - has many Comment and belongs to a User
// Post.hasMany(Comment, {
//     foreignKey: 'post_id',
// });

// Post.belongsTo(User, {
//     foreignKey: 'post_id',
// })

// //association for Comment - belongs to Post and User
// Comment.belongsTo(Post, {
//     foreignKey: 'post_id',
//     onDelete: 'CASCADE'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'user_id',
// })

module.exports = { 
    User, 
    Post, 
    // Comment,
};