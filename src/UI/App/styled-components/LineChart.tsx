import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export const LineChart = ({value,label}:any) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: label,
            datasets: [
                // {
                //     // label: 'First Dataset',
                //     data:value,
                //     fill: false,
                //     tension: 0.4,
                //     borderColor: documentStyle.getPropertyValue('--blue-500')
                // },
                // {
                //     label: 'Second Dataset',
                //     data: [28, 48, 40, 19, 86, 27, 90],
                //     fill: false,
                //     borderDash: [5, 5],
                //     tension: 0.4,
                //     borderColor: documentStyle.getPropertyValue('--teal-500')
                // },
                {
                    label: 'Total Asistencia',
                    data: value,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    tension: 0.4,
                    backgroundColor: 'rgba(255,167,38,0.2)'
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            responsive:true,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    return (
        <div className='w-full max-h-[100%] h-[90%] relative'>
            <Chart type="line" data={chartData} options={chartOptions} className='h-full w-full' />
        </div>
    )

}
