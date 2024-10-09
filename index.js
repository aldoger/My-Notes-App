import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let blogTitles = [];
let blogContents = [];

app.get("/", (req, res) => {
    res.render("index", { topics: blogTitles, contents: blogContents });
});

app.get("/make-notes", (req, res) => {
    res.render("makenotes");
});

app.post("/make", (req, res) => {
    const { topic, content } = req.body;

    blogTitles.push(topic);
    blogContents.push(content);

    res.redirect("/");
    return res.status(200);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
