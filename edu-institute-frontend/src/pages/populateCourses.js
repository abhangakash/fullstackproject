// populateCourses.js
const mongoose = require("mongoose");
const Course = require("./models/Course");

mongoose.connect("mongodb://localhost:27017/yourdbname", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const courses = [
      { title: "Data Structures and Algorithms", branch: "CS", description: "Learn the essential data structures and algorithms used in computer science.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "This course covers fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs, along with essential algorithms including sorting, searching, and dynamic programming." },
      { title: "Computer Networks", branch: "CS", description: "Study the principles of computer networking and communication.", imageUrl: "https://via.placeholder.com/300x200", fullDetails: "Learn about network models, protocols, security measures, and practical implementation strategies used in modern networking." },
      // Add other courses...
    ];
    
    await Course.insertMany(courses);
    console.log("Courses populated!");
    mongoose.disconnect();
  })
  .catch(err => console.log("Error:", err));
