const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_body: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        comment_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }, 
         },
         post_id: {
             type: DataTypes.INTEGER,
             references: {
                 model: 'post',
                 key: 'id'
             },
         },
    },
    {
        sequelize,
        freezeTableName: true,
        underscore: true,
        moduleName: 'comment',
    }
);

module.exports = Comment;