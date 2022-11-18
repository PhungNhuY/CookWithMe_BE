const mongoose =require('mongoose');

async function connect(){
    try {
        await mongoose.connect(process.env.DB_LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('-----Connect DB success!-----');
    } catch (error) {
        console.log(error);
        console.log('-----Connect DB fail!-----');
    }
}

module.exports = {connect};