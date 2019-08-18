// };
//NOTE: Gary is your new gmail account
module.exports = {

    'url' : `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0-gns32.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
    'dbName': process.env.DB_NAME
};

// nom start .env to run
