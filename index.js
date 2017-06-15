const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');
const database = require('./database');
const Blogpost = require('./models').Blogpost;
const Comment = require('./models').Comment;

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');

app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/aboutme', function(req, res) {
	res.render('aboutme.html');
});

app.get('/blog', function(req, res) {
	res.render('blog.html');
});

app.get('/contactme', function(req, res) {
	res.render('contactme.html');
});

app.get('/faq', function(req, res) {
	res.render('faq.html');
});

app.get('/blogpost', function(req, res) {
	const url = req.url;
	const querystring = url.slice(url.indexOf('?') + 1);

	Blogpost.findOne({ where: { id: querystring } }).then(function(blogpost){
		console.log('id: ' + querystring + 'title: ' + blogpost.title);
		const blogtitle = blogpost.title;

		res.render('blogpost.html', {
			title: blogtitle,
			body: blogpost.body,
			id: blogpost.id
		});
	});
});

app.post('/comment', function(req, res){
	const id = parseInt(req.params.id);
	const url = req.url;
	const querystr = url.slice(url.indexOf('?') + 1);
	const email = req.body.email;
    const name = req.body.name;
    const website = req.body.website;
	const comment = req.body.commentbody;

	database.transaction(function(t){
		return Blogpost.findOne({ where: { id: querystr } }).then(function(blogpost){
        return Comment.create({ 
            name: name,
            email: email, 
            website: website,
            body: comment,
            blog_id: querystr
        }, { transaction: t }).then(function(){
                console.log('Comment successfully added.' + querystr);
				return res.redirect('/');
            });
        });
	});
});

app.listen(3000, function() {
	console.log('Server is now running at port 3000');
});