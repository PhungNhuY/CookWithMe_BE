const authRouter = require('./authRouter');
const categoryRouter = require("./categoryRouter");

function route(app){
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
}

module.exports = route;