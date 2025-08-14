const express = require('express');
const axios = require('axios');
const cors=require('cors');
const app = express();
const PORT = 3000;
app.use(cors({
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
// In-memory data store for students
let students = [];

// Helper function to calculate BMI
const calculateBMI = (height, weight) => {
    // Height is in cm, weight is in kg. BMI formula: kg / (m^2)
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

// Helper function to fetch and transform user data
const initializeStudentData = async () => {
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const users = response.data.users;

        students = users.map(user => ({
            studentId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone:user.phone,
            age: user.age,

            gender: user.gender,
            bloodGroup: user.bloodGroup,
            height: user.height, // Height in cm
            weight: user.weight, // Weight in kg
            bmi: calculateBMI(user.height, user.weight),// Calculate BMI by height and weight
            image: user.image,
            university: user.university,
            profession: user.company.title,
            address:user.address,
            role:user.role,
            
          
        }));

        console.log('Student data initialized successfully.');
    } catch (error) {
        console.error('Error fetching or initializing student data:', error);
    }
};

// Middleware to parse JSON bodies
app.use(express.json());

// API Endpoints

// GET /students - Retrieve all students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// GET /students/:id - Retrieve a specific student
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.studentId === parseInt(req.params.id));
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: 'Student not found.' });
    }
});

// POST /students - Adds a new student
app.post('/students', (req, res) => {
    const { height, weight, ...otherDetails } = req.body;
    const newStudent = {
        studentId: students.length > 0 ? Math.max(...students.map(s => s.studentId)) + 1 : 1,
        ...otherDetails,
        height,
        weight,
        bmi: calculateBMI(height, weight),
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// GET /dashboard/stats - Provide more detailed statistical data
app.get('/dashboard/stats', (req, res) => {
    const totalStudents = students.length;

    // Calculate gender distribution
    const boysCount = students.filter(s => s.gender === 'male').length;
    const girlsCount = students.filter(s => s.gender === 'female').length;

   
    
    // Calculate BMI statistics
    const totalBMI = students.reduce((sum, s) => sum + parseFloat(s.bmi), 0);
    const averageBMI = (totalBMI / totalStudents).toFixed(2);

    // Calculate average height and weight
    const totalHeight = students.reduce((sum, s) => sum + parseFloat(s.height), 0);
    const averageHeight = (totalHeight / totalStudents).toFixed(2);

    const totalWeight = students.reduce((sum, s) => sum + parseFloat(s.weight), 0);
    const averageWeight = (totalWeight / totalStudents).toFixed(2);
    
    // Calculate blood group distribution
    const bloodGroupDistribution = students.reduce((acc, student) => {
        acc[student.bloodGroup] = (acc[student.bloodGroup] || 0) + 1;
        return acc;
    }, {});
    
    res.status(200).json({
        totalStudents,
        genderDistribution: {
            boys: boysCount,
            girls: girlsCount,
        },
       
        bloodGroupDistribution: bloodGroupDistribution,
        bmiStats: {
            averageBMI: parseFloat(averageBMI),
            averageHeight: parseFloat(averageHeight), // Added average height
            averageWeight: parseFloat(averageWeight)  // Added average weight
        }
    });
});
app.use('/',(req,res)=>{
  res.send("<h1>Welcome to Student Mangement System API</h1>");
});
// Initialize data and start the server
initializeStudentData().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
