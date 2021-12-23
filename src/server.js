const app = require("./index")
const connect = require("./configs/db.js")

app.listen(process.env.PORT || 7765, async function () {
    await connect();
    console.log("listening on port 7765");
})