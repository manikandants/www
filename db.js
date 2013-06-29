var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var db;
var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient){
	db = mongoClient.db('productdb');
	db.collection('products',{strict:true},function(err,collection){
		if(err){
			console.log("The 'Products' collection doesn't exist... Creating a new collection...");
			populateDB();
		}
	});
});

exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('products', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};
exports.findByBarcode = function(req, res) {
    var barCode = parseInt(req.params.barCode);
    console.log('findByBarcode: ' + barCode);
    db.collection('products', function(err, collection) {
        collection.findOne({'barCode': barCode},function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findByProductName = function(req, res) {
    var productName = req.params.productName;
    console.log('findByProductName: ' + productName);
    db.collection('products', function(err, collection) {
        collection.findOne({'productName': productName},function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
     console.log("Populating products database...");
     var products = [
        {"id": 1, "barCode": 100, "modelNo": 200, "imageName": "test.jpg", "objName": "switch1_obj.obj", "objCount": 3, "productName": "switch1", "productType": "Regulator", "segment": "Residential", "country": "India", "solutionID": 0},
        {"id": 2, "barCode": 101, "modelNo": 201, "imageName": "test.jpg", "objName": "switch2_obj.obj", "objCount": 3, "productName": "switch2", "productType": "Switch", "segment": "Residential", "country": "Italy", "solutionID": 0},
        {"id": 3, "barCode": 102, "modelNo": 202, "imageName": "test.jpg", "objName": "switch3_obj.obj", "objCount": 3, "productName": "switch3", "productType": "Socket", "segment": "Residential", "country": "France", "solutionID": 0},
        {"id": 4, "barCode": 103, "modelNo": 203, "imageName": "test.jpg", "objName": "switch4_obj.obj", "objCount": 3, "productName": "switch4", "productType": "Switch", "segment": "Residential", "country": "Germany", "solutionID": 1},
        {"id": 5, "barCode": 104, "modelNo": 204, "imageName": "test.jpg", "objName": "switch5_obj.obj", "objCount": 3, "productName": "switch5", "productType": "Switch", "segment": "Residential", "country": "China", "solutionID": 1},
        {"id": 6, "barCode": 105, "modelNo": 205, "imageName": "test.jpg", "objName": "switch6_obj.obj", "objCount": 3, "productName": "switch6", "productType": "Switch", "segment": "Residential", "country": "France", "solutionID": 1},
        {"id": 7, "barCode": 106, "modelNo": 206, "imageName": "test.jpg", "objName": "switch7_obj.obj", "objCount": 3, "productName": "switch7", "productType": "Switch", "segment": "Residential", "country": "India", "solutionID": 1},
        {"id": 8, "barCode": 107, "modelNo": 207, "imageName": "test.jpg", "objName": "switch8_obj.obj", "objCount": 3, "productName": "switch8", "productType": "Switch", "segment": "Residential", "country": "Denmark", "solutionID": 1},
        {"id": 9, "barCode": 108, "modelNo": 208, "imageName": "test.jpg", "objName": "switch9_obj.obj", "objCount": 3, "productName": "switch9", "productType": "Switch", "segment": "Residential", "country": "Italy", "solutionID": 1},
        {"id": 10, "barCode": 109, "modelNo": 209, "imageName": "test.jpg", "objName": "switch10_obj.obj", "objCount": 3, "productName": "switch10", "productType": "Switch", "segment": "Residential", "country": "Denmark", "solutionID": 1}		
    ];
    db.collection('products', function(err, collection) {
        collection.insert(products, {safe:true}, function(err, result) {});
    });
};