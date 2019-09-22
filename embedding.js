const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
 const course = await Course.update(
    {course: courseId},
    {$set: {
      'author.name': 'John Smith'
    }}
    );
 course.author.name = 'Fark Hosain';
 course.save();
 console.log(course)
}

// listCourses()
// updateAuthor('5d84455a7172771d8ca73e1a')

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId)
  course.authors.push(author);
  course.save()
 } 

 async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove();
  course.save()
 }
 
 removeAuthor('5d84502ea3d4dc24b092bb3d','5d84502ea3d4dc24b092bb3c' )
//  createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'John' }),
// ]);