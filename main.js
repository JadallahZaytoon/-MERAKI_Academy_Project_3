const express = require("express");
const app = express();
const PORT=5000;


const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];


app.get("/articles",(req,res)=>{


res.status(200);
res.json(articles);

});

app.get(`/articles/search_2`,(req,res)=>{

    res.status(200);
    const articleId = req.query.id;
    res.json(articles[articleId-1]);

 });




app.listen(PORT,()=>{

console.log(`Server works at port ${PORT}`);
});