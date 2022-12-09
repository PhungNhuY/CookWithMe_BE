const authRouter = require('./authRouter');
const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");
const imageRouter = require("./imageRouter");
const recommendRouter = require("./recommendRoute");
const favoriteRouter = require("./favoriteRoute");


function route(app){
    app.use('/auth', authRouter);
    app.use('/category', categoryRouter);
    app.use('/posts', postRouter);
    app.use("/image", imageRouter);
    app.use("/recommend", recommendRouter)
    app.use("/favorite", favoriteRouter);
}

module.exports = route;