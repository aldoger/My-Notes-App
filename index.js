import express from "express";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

let blogs = [];

app.get("/", (req, res) => {
    res.render("index", { blogs: blogs });
});

app.get("/make-notes", (req, res) => {
    res.render("makenotes");
});

app.post("/make", (req, res) => {
    const { topic, content } = req.body;
    const id = nanoid(5);

    let blog = {
        id,
        topic,
        content,
    };

    blogs.push(blog);

    res.redirect("/");
    return res.status(201);
});


app.get('/update-note', (req, res) => {
    const { blogId } = req.query; 
    res.render("updatenote", { id: blogId });
});


app.post("/update", (req, res) => {
    const { blogId, topicU, contentU } = req.body; 
    const index = blogs.findIndex((blog) => blog.id == blogId); 

    if (index != -1) {
        blogs[index] = {
            ...blogs[index], 
            topic: topicU, 
            content: contentU, 
        };

        res.redirect("/"); 
    } else {
        res.status(404).render("error"); 
    }
});

app.post("/delete", (req, res) => {
    const { blogId } = req.body;

    const index = blogs.findIndex((blog) => blog.id == blogId);
    if (index !== -1) {
        blogs.splice(index, 1);
    } else {
        return res.status(404).render("error");
    }

    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

