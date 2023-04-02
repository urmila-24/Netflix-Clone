const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const authRoute = require("./routes/auth.js");
const userRoute = require("./routes/users.js");
const movieRoute = require("./routes/movies.js");
const listRoute = require("./routes/lists.js");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connection sucessfull!"))
    .catch((err) => console.log(err));

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);


app.listen(8000, () => {
    console.log("backend is running");
})