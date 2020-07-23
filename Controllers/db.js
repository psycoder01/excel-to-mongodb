const dbClient = require("mongodb").MongoClient;

const mongoURI = "mongodb://localhost:27017/";

//DB connection
const dbParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const dbInsert = data => {
    dbClient.connect(mongoURI, dbParams, (err, db) => {
        if (err) throw err;
        let dbInit = db.db("data");
        dbInit.collection("test").insertMany(data, (err, res) => {
            if (err) throw err;
            db.close();
        });
    });
};

const dbSearch = async data => {
    let names = [];
    data.forEach(item => names.push(item.Name));
    const db = await dbClient.connect(mongoURI, dbParams);
    const dbInit = db.db("data");
    const repeated = await dbInit
        .collection("test")
        .find({ Name: { $in: names } })
        .toArray();
    return repeated.reduce((a, c) => [...a, c.Name], []);
};

module.exports = { dbInsert, dbSearch };
