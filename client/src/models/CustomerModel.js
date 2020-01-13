const moongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    birthday: {type: String, required: true},
    gender: {type: String, required: true},
    job: {type: String, required: true},
    completed: {type: BigInt, default: false}
    },
    {
        timestamps: true
    },
    {
        collection: 'CUSTOMER'
    }
);