const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//connects to the MongoDb using mongoose.connect
const db = require("./models");
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) .then(()=> {
    console.log("connected to the database");
}) .catch((err) => {
    console.log("cannot connect to the database", err);
    process.exit();
});

//sample route
app.get("/",(req,res) => {
    res.json({status: true, message: "test route"})
});

//connects to the user routes page
require("./routes/user.routes")(app);

//app to listen on the particular PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});