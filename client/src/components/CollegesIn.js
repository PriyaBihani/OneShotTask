import React, { useState, useEffect } from 'react'
import CollegeTable from './layout/CollegeTable'
import axios from 'axios'
import { Typography } from 'antd';
const { Title } = Typography;



const CollegesIn = ({ match }) => {
    const { region } = match.params

    const [colleges, setcolleges] = useState({})

    const getCollegesInRegion = async () => {
        const response = await axios.get(`/api/college/in/${region}`)

        const { colleges } = response.data.data
        console.log(colleges)
        setcolleges(colleges)
    }

    useEffect(() => {
        getCollegesInRegion()
    }, [])

    return (
        <div >
            <Title level={1}>Colleges in {region}</Title>
            {colleges.length > 0 && <CollegeTable colleges={colleges} />}
        </div>
    );
}

export default CollegesIn;