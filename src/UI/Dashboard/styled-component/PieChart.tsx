import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export const PieChart = ({params}:any) => {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: params.labels,
            datasets: [
                {
                    data: params.data,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ] 
                }
            ]
        }
        const options = {
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
        <div className="w-full h-[45vh] overflow-hidden" >
            <Chart type="pie" data={chartData} options={chartOptions} className='w-full h-full flex justify-center items-center ' />
        </div>
    )
}
