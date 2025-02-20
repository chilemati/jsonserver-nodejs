const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const helmet = require('helmet');
const { PORT } = process.env;
const axios = require('axios');
const bodyParser = require('body-parser');

const origin = ["http://localhost:5173","https://shareyourideas.vercel.app"]; 

// middleware

app.use(cors({ credentials: true, origin: origin })); // allow commuication with FE
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); // allow form fields
app.use(bodyParser.json({ limit: "50mb" })); // allow json fields



//  routes
app.get("/", (req, res) => {
    axios.get("http://localhost:9000/blogs")
    .then(r=> {
      res.json({ status: true, data: r.data });

    })
    .catch(err=> {
      res.json({status:false})
    })
});
app.post("/blog", (req, res) => {
  let {title,body,author} = req.body;
    axios.post("http://localhost:9000/blogs",{title,body,author})
    .then(r=> {
      res.json({ status: true });

    })
    .catch(err=> {
      res.json({status:false})
    })
});
app.patch("/blog/:id", (req, res) => {
  let {title,body,author} = req.body;
  let {id} = req.params;
  let upd = {};
  if (title !== undefined) {
    // card_title field was sent
    upd.title = title;
  }
  if (body !== undefined) {
    // card_body field was sent
    upd.body = body;
  }
  if (author !== undefined) {
    // card_author field was sent
    upd.author = author;
  }
  
    axios.patch("http://localhost:9000/blogs/"+id,upd)
    .then(r=> {
      res.json({ status: true});

    })
    .catch(err=> {
      res.json({status:false})
    })
});

app.delete("/blog/:id", (req, res) => {
  let {id} = req.params;
    axios.delete("http://localhost:9000/blogs/"+id)
    .then(r=> {
      res.json({ status: true });

    })
    .catch(err=> {
      res.json({status:false})
    })
});
// error routes
app.get("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.post("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.delete("*", (req, res) => {
  res.json({ err: "Invalid route" });
});
app.patch("*", (req, res) => {
  res.json({ err: "Invalid route" });
});

//start server
app.listen(PORT || 5000, () => {
  console.log(`Listening to request on port ${PORT}`);
});
