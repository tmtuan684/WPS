Student Management Web Application (MongoDB + Node.js + Express + EJS)

This project is a full-stack web application built as a hands-on exercise for learning how to integrate MongoDB with Node.js, Express, Mongoose, and EJS.
It demonstrates how to implement complete CRUD (Create, Read, Update, Delete) functionality inside a simple and clean Bootstrap-styled interface.

# I. Features
1. Import Initial Data from JSON
   - Loads student data from a JSON file.
   - Uses Mongoose to insert the data into MongoDB.
   - Useful for quickly populating the database for testing or demonstrations.

2. View All Students
   - Retrieves all student documents from MongoDB.
   - Displays them at the root URL (/) in a searchable Bootstrap table.
   - Users can filter students by name or email in real-time.

3. Add New Student
   - Includes an “Add New Student” button.
   - Opens a form to enter student information.
   - Submitting the form saves the new student to MongoDB.

4. Edit Existing Student
   - Each student row includes an Edit button.
   - Opens a pre-filled form allowing users to update student details.
   - Updates are saved back into MongoDB using Mongoose.

5. Delete Student
   - Each student can be deleted via a Delete button.
   - A confirmation step prevents accidental removal.
   - The student record is removed from MongoDB.

# II. Technology Stack
|Layer|	Tools|
|-----|------|
|Frontend|	HTML, CSS, Bootstrap 5, EJS templates|
|Backend|	Node.js, Express.js|
|Database|	MongoDB|
|ORM / ODM|	Mongoose|
|Data|	JSON import for initial dataset|

# III. Project Structure
```
project/
│
├── model/
│   ├── dbconnect.js
│   └── studentModel.js
│
├── data/
│   └── students.json
│
├── views/
│   ├── students.ejs
│   ├── new-student.ejs
│   ├── edit-student.ejs
│   └── delete-student.ejs
│
├── .env
├── app.js
└── README.md
```
# IV. Installation & Setup
1. Clone the project
```
git clone <repo-url>
cd project
```
2. Install dependencies
```
npm install
```
3. Add environment variables


```
Create a .env file:
    CONNECTION_STRING=<mongodb+srv://127.0.0.1:27017/studentDB>
    HOST=127.0.0.1
    PORT=3000
```
4. Run the application
```
node app.js
```

# V. How the App Works
Startup

   1. Connects to MongoDB.

   2. Loads model definitions.

   3. (Optionally) Imports students from JSON.

CRUD Operations
```
Create → /students/new

Read → /

Update → /students/:id/edit

Delete → /students/:id/delete
```
Mongoose handles validation, querying, and data persistence.

# VI. Learning Outcomes

By completing or studying this project, you will learn:
- How to connect a Node.js app to MongoDB using Mongoose
- How to design and use a Mongoose schema and model
- How to implement full CRUD operations
- How to populate MongoDB from a JSON file
- How to render server-side HTML using EJS
- How to structure a maintainable full-stack application

# VII. License
This project is for educational purposes. Feel free to modify and extend it.


# Additional Notes

The front-end is styled with Bootstrap, with some components generated using ChatGPT assistance.