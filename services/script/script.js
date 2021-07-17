let College = require('../mongodb/models/College'),
    Student = require('../mongodb/models/Student');
const mongoose = require('mongoose')



const connectDb = async () => {
    try {
        const pass = 'priya'
        await mongoose.connect(`mongodb+srv://priya:${pass}@cluster0.sixcu.mongodb.net/OneShot?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to the database......');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


const temp = async () => {

}


const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const createColleges = async () => {
    await connectDb()



    const locations = [{ city: "Delhi", state: "Delhi" }, { city: "Mumbai", state: "Maharashtra" }, { city: "Pune", state: "Maharashtra" }, { city: "Ahemdabad", state: "Gujarat" }, { city: "Noida", state: "Uttar Pradesh" }, { city: "Bangalore", state: "Karnataka" }, { city: "Kanpur", state: "Uttar Pradesh" }, { city: "Roorkee", state: "Uttarakhand" }, { city: "Dehradun", state: "Uttarakhand" }, { city: "Vellore", state: "Karnataka" }]

    const courses = ['B.Tech', 'B.E', 'MBA', 'M.Sc', 'BBA']

    const addStudents = async (id, courses) => {
        for (let i = 0; i < 50 + getRandomInt(50); i++) {
            const student = new Student({
                "name": `Student${getRandomInt(1000) + getRandomInt(1000)}`,
                "year": 2010 + getRandomInt(10),
                "college": id,
                "course": courses[getRandomInt(courses.length)]
            })
            const studentCollege = await College.findById(id)
            studentCollege.students = studentCollege.students + 1
            await College.findByIdAndUpdate(studentCollege, studentCollege)
            await student.save()
        }
    }



    try {

        for (let i = 0; i < 99; i++) {
            const { city, state } = locations[getRandomInt(10)]
            let n = [...courses]
            n.splice(getRandomInt(4), getRandomInt(2) + 1)
            const college = new College({
                "name": `College${i}`,
                "city": city,
                "state": state,
                "year": 1980 + getRandomInt(40),
                "courses": n,
                "tier": getRandomInt(2) + 1
            })
            // create college
            await college.save()
            // add students
            await addStudents(college._id, college.courses)
            console.log(`${i + 1} colleges added`)
        }
    } catch (error) {
        console.log(error)
    }
}



createColleges()

// const courses = ['B.Tech', 'B.E', 'MBA', 'M.Sc', 'BBA']

// const n = [...courses]
// n.splice(1, 3)
// console.log(n)

const colleges = [{
    "students": 55,
    "courses": [
        "B.Tech",
        "B.E",
        "BBA"
    ],
    "_id": "60f02276133b4b6cff157c9d",
    "name": "College0",
    "city": "Roorkee",
    "state": "Uttarakhand",
    "year": 2007,
    "tier": 1,
    "createdAt": "2021-07-15T11:56:38.597Z",
    "updatedAt": "2021-07-15T11:56:38.884Z",
    "__v": 0
},
{
    "students": 52,
    "courses": [
        "B.Tech",
        "B.E",
        "MBA"
    ],
    "_id": "60f02276133b4b6cff157d7b",
    "name": "College1",
    "city": "Delhi",
    "state": "Delhi",
    "year": 2006,
    "tier": 2,
    "createdAt": "2021-07-15T11:56:38.900Z",
    "updatedAt": "2021-07-15T11:56:39.286Z",
    "__v": 0
},
{
    "students": 62,
    "courses": [
        "B.Tech",
        "B.E",
        "MBA",
        "BBA"
    ],
    "_id": "60f02277133b4b6cff157e4d",
    "name": "College2",
    "city": "Bangalore",
    "state": "Karnataka",
    "year": 1994,
    "tier": 1,
    "createdAt": "2021-07-15T11:56:39.296Z",
    "updatedAt": "2021-07-15T11:56:39.514Z",
    "__v": 0
},
{
    "students": 52,
    "courses": [
        "B.E",
        "MBA",
        "M.Sc",
        "BBA"
    ],
    "_id": "60f02277133b4b6cff157f47",
    "name": "College3",
    "city": "Ahemdabad",
    "state": "Gujarat",
    "year": 2012,
    "tier": 1,
    "createdAt": "2021-07-15T11:56:39.517Z",
    "updatedAt": "2021-07-15T11:56:39.682Z",
    "__v": 0
},
{
    "students": 59,
    "courses": [
        "B.Tech",
        "B.E",
        "MBA",
        "BBA"
    ],
    "_id": "60f02277133b4b6cff158019",
    "name": "College4",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "year": 2018,
    "tier": 1,
    "createdAt": "2021-07-15T11:56:39.683Z",
    "updatedAt": "2021-07-15T11:56:39.847Z",
    "__v": 0
}]

function uniq(a) {
    var map = {};

    a.map(function (college) {

        // return map.hasOwnProperty(college) ? false : (map[college] = true);
        map.hasOwnProperty(college.city) ? map[college.city] = map[college.city] + 1 : map[college.city] = 1;
        console.log(map)
    });
}

// console.log(uniq(colleges))