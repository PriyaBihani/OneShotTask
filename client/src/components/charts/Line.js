import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
};



const LineChart = ({ data, handler }) => {

    const options = {
        onClick: (e, element) => {

            handler(Object.keys(data)[element[0].index])
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const colors = []
    const random_rgba = () => {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }

    for (let i = 0; i < Object.keys(data).length; i++) {
        colors.push(random_rgba())
    }

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Number of students',
                data: Object.values(data),
                backgroundColor: colors,
                borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Line data={chartData} options={options} />
        </>
    )
};

export default LineChart;
