const express = require('express');
const app = express();
const Joi = require('joi');
 
app.use(express.json()); //middleware used in request processing pipeline

//get method accepts two parameter path or url & callback function for this endpoint
//callback function also called route handler

var courses = [
  { id : 1 , name : "course1"},
  { id : 2 , name : "course2"},
  { id : 3 , name : "course3"}
];

app.get('/', (req, res) => {
  res.send("Hello World!");
});

app.get('/collection/courses', (req, res) => {
  res.send(courses);
});

app.get('/collection/courses/:id', (req, res) => {
  const course = courses.find(course => parseInt(req.params.id) === course.id);
  if(!course) {
    res.statusCode = 404;
    res.send(`404!! Course with id ${req.param.id} not found`);
  } else {
    res.send(course);
  }
});

app.post('/collection/courses', (req, res) => {

  const {error} = validateCourse(req.body);
  if (error) {
    //400 Bad Request
    res.status(400).send(error.message);
    return;
  }
  const course = {
    id : courses.length + 1,
    name : req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('collection/courses/:id', (req, res) => {
  const course = courses.find(course => parseInt(req.params.id) === course.id);
  if(!course) {
    res.statusCode = 404;
    res.send(`404!! Course with id ${req.param.id} not found`);
  }
  
  //const result = validateCourse(req.body);
  const {error} = validateCourse(req.body);
  if (error) {
    //400 Bad Request
    res.status(400).send(error.message);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(course => parseInt(req.params.id) === course.id);
  if(!course) {
    res.statusCode = 404;
    res.send(`404!! Course with id ${req.param.id} not found`);
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name : Joi.string().min(3).required()
  };
  return Joi.validate(req.body, schema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

// app.post();
// app.put();
// app.delete();