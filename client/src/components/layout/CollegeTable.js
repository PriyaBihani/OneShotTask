import React from 'react'
import { Link } from 'react-router-dom'

import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'College Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <Link to={`/college/${text}`}>{text}</Link>,
    },
    {
        title: 'Estabilished',
        dataIndex: 'year',
        key: 'year',
        render: text => <a>{text}</a>,

    },
    {
        title: 'Students',
        dataIndex: 'students',
        key: 'students',
        render: text => <a>{text}</a>,

    },
    {
        title: 'Location',
        dataIndex: 'city',
        key: 'city',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Courses',
        key: 'courses',
        dataIndex: 'courses',
        render: courses => (
            <>
                {courses.map(tag => {

                    return (
                        <Tag color={"green"} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    }
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        estd: 32,
        location: 'New York No. 1 Lake Park',
        courses: ['nice', 'developer'],
    },

];


const CollegeTable = ({ colleges }) => {
    return (<Table onRow={(record, rowIndex) => {
        return {
            onClick: event => { console.log(event.target) }, // click row
            onDoubleClick: event => { }, // double click row
            onContextMenu: event => { }, // right button click row
            onMouseEnter: event => { }, // mouse enter row
            onMouseLeave: event => { }, // mouse leave row
        };
    }} columns={columns} dataSource={colleges} />);
}

export default CollegeTable;