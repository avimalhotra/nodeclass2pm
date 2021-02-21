const mongodb=require("mongodb").MongoClient;
const assert=require("assert");

const url='mongodb://localhost:27017';

const dbName='sample';

const client = new mongodb(url,{ useUnifiedTopology: true });


// insert
const insertDocuments = function(db, callback) {
    // Get the documents collection
const collection = db.collection('cars');
    // Insert some documents
collection.insertMany([
    {name : "dzire", type : 'sedan', price: 900000,  fuel:'petrol'}
], function(err, result) {
    assert.strictEqual(err, null);
    assert.strictEqual(1, result.result.n);
    assert.toString(1, result.ops.length);
    console.log("Inserted 1 documents in collection");
    callback(result);
});
};

//
const findDocuments = function(db, callback) {
   
    // Get the documents collection
    const collection = db.collection('cars');
   
     // Find some documents
    collection.find({}).toArray(function(err, docs) {
        assert.strictEqual(err, null);
        console.log("Found the following records");
        console.log(docs);
      // docs.forEach(element => {console.log(`Car is ${element.name} and price is ${ element.price}`);});
        callback(docs);
    });
}



client.connect((err)=>{
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    console.log("Connected successfully to Database server");
    
    
    // insertDocuments(db, function() {
    //     client.close();
    // });

    // findDocuments(db,()=>{
    //     client.close();
    // })
    
    
   

  });