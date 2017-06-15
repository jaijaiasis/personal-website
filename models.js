const Sequelize = require('sequelize');
const database = require('./database');

const Blogpost = database.define('blogposts', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
	timestamps: true
});

const Comment = database.define('comments', {
    comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        defaultValue: 'Anonymous'
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    website: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    body: {
        type: Sequelize.STRING,
        defaultValue: null
    },

    blog_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'blogposts',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

Comment.belongsTo(Blogpost, {foreignKey: 'blog_id'});


module.exports.Blogpost = Blogpost;
module.exports.Comment = Comment;
