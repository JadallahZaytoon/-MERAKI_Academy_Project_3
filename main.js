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

// app.get(`/articles/id`, (req, res) => {

//   const

//   const articleId = req.query.id;

//   const found = articles.find((element) => {
//     return element.id == articleId;
//   });

//   if (found) {
//     res.status(200);
//     res.json(found);
//   } else {
//     res.status(404);
//     res.json("User not found");
//   }
// });

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

app.put("/articles/:id", (req, res) => {
  const userId = req.params.id;
  let i;
  const found = articles.find((element, index) => {
    i = index;
    return element.id == userId;
  });

  if (found) {
    articles[i] = req.body.id;
    res.status(200);
    res.json(articles[i]);
  } else {
    res.status(404);
    res.json("User not found");
  }
});

app.delete("/articles/:id", (req, res) => {
  const delById = req.params.id;

  let i;
  const found = articles.find((element, index) => {
    i = index;
    return element.id == delById;
  });

  if (found) {
    articles.splice(i, 1);
    res.json({
      success: true,
      message: `Success Delete article with id ${i}`,
    });
  } else {
    res.json("failed");
  }
});

app.delete("/articles", (req, res) => {
  const delByAuthor = req.query.author;

  const found = articles.filter((element) => {
    return element.author != delByAuthor;
  });

  if (found) {
    articles = [...found];

    res.json({
      success: true,
      message: `Success Delete articles for the author ${delByAuthor}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server works at port ${PORT}`);
});
