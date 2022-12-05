const authRouter = require('./authRouter');
const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");

function route(app){
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
    app.use('/posts', postRouter);
}

module.exports = route;