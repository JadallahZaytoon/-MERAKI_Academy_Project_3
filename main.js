const express = require("express");
const app = express();
const PORT = 5000;
// const { v4: uuidv4 } = require("uuid");
const db = require("./project_3_v01");
const { user1, articles1 } = require("./schema");
app.use(express.json());

let articles = [
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
//this function to get user
app.get("/users", (req, res) => {
  res.status(200);

  user1
    .find({}, "firstName lastName country")
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//this function to get all articles
app.get("/articles", (req, res) => {
  res.status(200);

  articles1
    .find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//this function to get article by article id
app.get("/article", (req, res) => {
  const articleId = req.query.id;
  articles1
    .findOne({ _id: articleId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//this function to get all articles by author id
app.get("/article/authorid", (req, res) => {
  const authorId = req.query.author;
  articles1
    .find({ author: authorId })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//this function to input a new user.
app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;

  const newUser = new user1({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });

  newUser
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//this function to input a new article.
app.post("/articles", (req, res) => {
  const { title, description, author } = req.body;

  const newArticle = new articles1({ title, description, author });

  newArticle
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
//this function to update an article by its id.
app.put("/article/update", (req, res) => {
  // let {title,description,author}=req.body
  const articleId = req.body;
  articles1
    .findOneAndUpdate({ _id: articleId }, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//this function to delete an article by its id.
app.delete("/article/delete", (req, res) => {
  // let {task, description, deadline,
  //     isCompleted,priority} = req.body;

  const articleId = req.body;

  articles1
    .findOneAndDelete({ _id: articleId }, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.delete("/article/delete", (req, res) => {
  // let {task, description, deadline,
  //     isCompleted,priority} = req.body;

  const authorId = req.body;

  articles1
    .findOneAndDelete({ author: authorId }, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server works at port ${PORT}`);
});
