const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PORT = 5000;
require("dotenv").config();
const db = require("./project_3_v01");
const { user1, articles1, commenter1, role1 } = require("./schema");
app.use(express.json());
const secret = process.env.SECRET;

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
//As a user, I should be able to login as an author
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let newrole;
  user1
    .find({ email: email })
    .then((result) => {
      role1.findById(result[0].role).then((result2) => {
        req.permissions = result2.permissions;
        newrole = req.permissions;
      });

      bcrypt.compare(password, result[0].password, (err, result1) => {
        if (result1) {
          const payload = {
            userId: result[0]._id,
            country: result[0].country,
            role: newrole,
          };

          const options = {
            expiresIn: "60m",
          };

          const token = jwt.sign(payload, secret, options);

          res.status(200);
          res.json(token);
        } else {
          res.status(403);
          res.json("The password you’ve entered is incorrect");
        }
      });
    })
    .catch((err) => {
      res.status(404);
      res.json("The email doesn't exist");
    });
});

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result) {
      req.token = result;
      next();
    } else {
      res.json("Invalid");
    }
  });
};

const authorization = (string) => {
  return (req, res, next) => {
    const permissionArray = req.token.role;
    const found = permissionArray.find((element) => {
      return element === string;
    });

    if (found) {
      next();
    } else {
      res.status(403);
      res.json("forbidden");
    }
  };
};
app.post(
  "/articles/:id/comments",
  auth,
  authorization("CREATE_COMMENTS"),
  (req, res) => {
    const { comment, commenter } = req.body;
    const articleId = req.params.id;
    const newComment = new commenter1({
      comment,
      commenter,
    });
    let id;
    newComment
      .save()
      .then((result) => {
        id = result._id;
        articles1
          .findOneAndUpdate(
            { _id: articleId },
            { $push: { commnetid: result._id } }
          )
          .then(result)
          .catch((err) => res.json(err));
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  }
);

//this function to create a new user.
app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password, role } = req.body;

  const newUser = new user1({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
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

app.post("/roles", (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new role1({
    role,
    permissions,
  });

  newRole
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
app.delete("/article/deleteId", (req, res) => {
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

//this function to delete an article by author id.
app.delete("/article/delete", (req, res) => {
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
