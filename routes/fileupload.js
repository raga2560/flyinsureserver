


//  https://github.com/rahil471/file-upload-with-angularjs-and-nodejs.git

// https://stackoverflow.com/questions/37559610/socket-io-emit-on-express-route
var config = require('../config.json');

 /* The SessionHandler must be constructed with a connected db */
function FileUpload (db, multer) {
    "use strict";

    var storagefile = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
			var dir = './'+config.fileuploaddir +'/';
			console.log(dir);
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-'+file.originalname.split('.')[0]+'-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

	var uploadfile = multer({ //multer settings
                    storage: storagefile
                }).single('file');

	//--------------------------------------------//

    
    var storageimage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
			var dir = './'+config.imageuploaddir +'/';
            cb(null, dir);
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-'+file.originalname.split('.')[0]+'-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        }
    });

    var uploadimage = multer({ //multer settings
                    storage: storageimage
                }).single('file');

//--------------------------------------------//

				
    /** API path that will upload the files */
    this.fileupload = function(req, res) {
        uploadfile(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
			var str = req.file.path.replace('\\', '/');
			console.log(req);
             res.json({error_code:0,err_desc:null, file: req.file.originalname, path:str});
        });
    };
//--------------------------------------------//

	 /** API path that will upload the files */
    this.imageupload = function(req, res) {
        uploadimage(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
			var str = req.file.path.replace('\\', '/');
             res.json({error_code:0,err_desc:null, file: req.file.originalname, path:str});
        });
    };
	
	
    
   
	
	
	
	
  
	
}



module.exports = FileUpload;
