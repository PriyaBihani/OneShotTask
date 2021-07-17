import React from 'react';
import { Bar } from 'react-chartjs-2';

const d = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const VerticalBar = ({ data, handler }) => {

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
                label: '# of colleges',
                data: Object.values(data),
                backgroundColor: colors,
                borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Bar data={chartData} options={options} />
        </>
    )
};

export default VerticalBar;
