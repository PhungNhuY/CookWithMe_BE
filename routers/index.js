const authRouter = require('./authRouter');
const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");
const recommendRouter = require("./recommendRoute");


function route(app){
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
    app.use('/posts', postRouter);
    app.use("/recomends", recommendRouter)
}

module.exports = route;