var FileUpload = require('./fileupload')
var MoronyAuth = require('./moronyauth/moronyauth')
	module.exports = exports = function(app, db, io, multer) {
	
	var fileupload = new FileUpload(db, multer);
	var morony = new MoronyAuth(app, db, multer);
	
    

	app.post('/fileupload', fileupload.fileupload);
	app.post('/imageupload', fileupload.imageupload);
	/*
	app.post('/demo/getInfo', demo.getInfo);
	app.post('/demo/insertplayer', demo.insertplayer);
	app.post('/demo/getplayer', demo.getplayer);
	app.get('/demo/getplayers', demo.getplayers); */
	
}
