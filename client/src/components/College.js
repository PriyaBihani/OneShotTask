import React, { useState, useEffect, useCallback } from 'react'
import { Typography } from 'antd';

import VerticalBar from './charts/Barchart'
import Donut from './charts/Donut'
import LineChart from './charts/Line'

import axios from 'axios'
import StudentTable from './layout/StudentTable';
const { Title } = Typography;


const College = ({ match, history }) => {
    const { name } = match.params
    const [courses, setcourses] = useState({})
    const [students, setstudents] = useState([])
    const [nearbyColleges, setnearbyColleges] = useState({})


    const getCollegeData = async () => {
        const response = await axios.get(`/api/college/${name}`)
        const [college] = response.data.data.college
        const { students, nearbyColleges } = college
        var coursesMap = {};
        var nearbyCollegesMap = {};
        students.forEach(student => {
            coursesMap.hasOwnProperty(student.course) ? coursesMap[student.course] = coursesMap[student.course] + 1 : coursesMap[student.course] = 0
        })
        nearbyColleges.forEach(college => {
            nearbyCollegesMap[college.name] = college.students
        })

        setcourses(coursesMap)
        setstudents(students)
        setnearbyColleges(nearbyCollegesMap)

    }

    useEffect(() => {
        getCollegeData()
    }, [])

    const handler = (label) => {
        history.push(`/college/${label}`)
    }



    return (
        <div className="container">
            <div >
                <Title level={1}>{name} Statistics</Title>
            </div>
            <div className="dashboard_charts flex">
                <div >
                    <Title level={2}>Nearby colleges stats</Title>
                    <LineChart handler={handler} data={nearbyColleges} />

                </div>
                <div>
                    <Title level={2}>Student distribution by course</Title>
                    <Donut handler={() => { }} data={courses} />
                </div>
            </div>
            <br />
            <div >
                <Title level={1}>Students in {name}</Title>
                <StudentTable students={students} />
            </div>

        </div >
    );
}

export default College;