import React from 'react'

import { Table, Tag, Space } from 'antd';

const columns = [
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'JoinYear',
        dataIndex: 'year',
        key: 'year',
        render: text => <a>{text}</a>,

    },
    {
        title: 'Course',
        key: 'course',
        dataIndex: 'course',
        render: course => (
            <Tag color={"green"} >
                {course.toUpperCase()}
            </Tag>
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


const StudentTable = ({ students }) => {
    console.log(students)
    return (<Table onRow={(record, rowIndex) => {
        return {
            onClick: event => { console.log(event.target) }, // click row
            onDoubleClick: event => { }, // double click row
            onContextMenu: event => { }, // right button click row
            onMouseEnter: event => { }, // mouse enter row
            onMouseLeave: event => { }, // mouse leave row
        };
    }} columns={columns} dataSource={students} />);
}

export default StudentTable;