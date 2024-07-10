const express = require('express');
const app = express();
const categorieRouter =require("./routes/categorie.route")
const scategorieRouter=require("./routes/scategorie.route")
const articleRouter =require("./routes/article.route")
const cors=require("cors")

app.use(cors())


const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
app.use(express.json());
app.get("/",(req, res) => {
res.send("bienvenue sur notre sites")
})
mongoose.connect(process.env.DATABASECLOUD, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
app.use('/api/categories', categorieRouter);
app.use('/api/scategories',scategorieRouter);
app.use('/api/articles', articleRouter);
app.listen(process.env.PORT)
console.log("application run port  "+process.env.PORT  )
module.exports =app;