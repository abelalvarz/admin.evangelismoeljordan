import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export const PieChart = ({params}:any) => {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: params.categories,
            datasets: [
                {
                    data: params.totalAttendance,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--gray-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--gray-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                    ] 
                }
            ]
        }
        const options = {
            responsive:true,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [params]);

    return (
        <div className="w-full h-[300px] relative  " >
            <Chart type="doughnut" data={chartData} options={chartOptions} className='h-full w-full flex justify-center items-center' />
        </div>
    )
}
