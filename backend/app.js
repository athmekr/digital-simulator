const e = require("express");

const express = require ('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
  const posts = [
    {
      id:'thanos',
      title: 'First server-side post',
      content: 'this is coming from the server'
    },
    {
      id:'aek',
      title: 'Second server-side post',
      content: 'this is coming from the server!'
    }
  ];

  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
