

import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { isSmallScreen } from '../utils';

interface Props {
    label: string[],
    colors: string[],
    value: number[]
}
const adjustFontSize = () => {
    const smallScreenFontSize = 12;
    const largeScreenFontSize = 17;
    return isSmallScreen() ? smallScreenFontSize : largeScreenFontSize;
};


export const BarChart = ({ label, value, colors }: Props) => {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: label,
            datasets: [
                {
                    label: 'Asistentes',
                    backgroundColor: colors,
                    borderColor: ['#007bff', '#28a745', '#fd7e14', '#6f42c1'],
                    data: value
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 100,
                            size: adjustFontSize(),

                            display: false

                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false,

                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                        font: { size: adjustFontSize() }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [label, value]);

    return (
        <div className="graph-container" >
            <Chart type="bar" data={chartData} options={chartOptions} className='graph-content ' />
        </div>
    )
}
