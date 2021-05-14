const express = require("express");
const app = express();
const PORT = 5000;
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

app.get(`/articles/search_2`, (req, res) => {
  const articleId = req.query.id;

  const found = articles.filter((element) => {
    return element.id == articleId;
  });

  if (found) {
    res.status(200);
    res.json(found);
  } else {
    res.status(404);
    res.json("User not found");
  }
});

app.post("/articles", (req, res) => {
  const newArticel = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  articles.push(newArticel);
  res.status(201);
  res.json(newArticel);
});

app.listen(PORT, () => {
  console.log(`Server works at port ${PORT}`);
});

// {
//     "title": "server",
//     "description":"lorem, quam, mozzza",
//     "author":"Jadallah"
// }
