import React, { useState, useEffect, useCallback, memo } from 'react'
import { Typography } from 'antd';
import { Skeleton } from 'antd';

import VerticalBar from './charts/Barchart'
import Donut from './charts/Donut'
import LineChart from './charts/Line'

import axios from 'axios'
import CollegeTable from './layout/CollegeTable';
const { Title } = Typography;


const Dashboard = ({ history }) => {
    const [data, setdata] = useState([])
    const [cities, setcities] = useState({})
    const [states, setstates] = useState({})
    const [courses, setcourses] = useState({})
    const [students, setstudents] = useState({})

    const getCollegeData = useCallback(
        async () => {
            const response = await axios.get('/api/college/all')

            const { colleges } = response.data.data
            setdata(colleges)

            var cityMap = {};
            var stateMap = {};
            var coursesMap = {};
            var studentsMap = {};
            colleges.forEach((college) => {
                // cities
                cityMap.hasOwnProperty(college.city) ? cityMap[college.city] = cityMap[college.city] + 1 : cityMap[college.city] = 1;
                // states
                stateMap.hasOwnProperty(college.state) ? stateMap[college.state] = stateMap[college.state] + 1 : stateMap[college.state] = 1;
                // courses
                college.courses.forEach(course => {
                    coursesMap.hasOwnProperty(course) ? coursesMap[course] = coursesMap[course] + 1 : coursesMap[course] = 1;
                })
                // students
                studentsMap[college.name] = college.students

            });
            setcourses(coursesMap)
            setcities(cityMap)
            setstates(stateMap)
            setstudents(studentsMap)
        }
        ,
        [],
    )

    useEffect(() => {
        getCollegeData()
    }, [])


    const handler = (label) => {
        history.push(`/college/in/${label}`)
    }
    // console.log(states)
    return (
        <div className="container">
            {
                data && data.length > 0 ? <><div style={{ textAlign: "center" }}>
                    <Title level={1}>Dashboard</Title>
                </div>
                    <div className="dashboard_charts flex">
                        <div >
                            <Title level={2}>College stats by cities</Title>
                            <VerticalBar handler={handler} data={cities} />
                        </div>
                        <div>
                            <Title level={2}>College stats by states</Title>
                            <Donut handler={handler} data={states} />

                        </div>
                    </div>
                    <br />
                    <div className="dashboard_charts flex">
                        <div >
                            <Title level={2}>Student stats by colleges</Title>
                            <LineChart handler={(label) => {
                                history.push(`/college/${label}`)
                            }} data={students} />
                        </div>
                        <div>
                            <Title level={2}>Courses stats </Title>
                            <Donut handler={() => { }} data={courses} />
                        </div>
                    </div>
                    <br />
                    <div >
                        <Title level={1}> All Colleges</Title>
                        {data.length > 0 && <CollegeTable colleges={data} />}

                    </div></> : <Skeleton active />

            }
        </div >
    );
}

export default memo(Dashboard);