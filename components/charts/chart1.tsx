'use client';
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartOne: React.FC = () => {
  const [dataChart, setDataChart] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('2024-05-01');
  const [endDate, setEndDate] = useState<string>('2024-05-15');
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState<ApexOptions>({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 420,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: '0px',
        },
      },
      min: 0,
      max: 10,
    },
  });
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Products Sales',
        data: [],
      },
    ],
  });

  const generateDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray: string[] = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      let formattedDate: string;

      if (startDate.getFullYear() !== endDate.getFullYear()) {
        formattedDate = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } else if (startDate.getMonth() === endDate.getMonth()) {
        formattedDate = currentDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      } else {
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const date = String(currentDate.getDate()).padStart(2, '0');
        formattedDate = `${month}-${date}`;
      }

      dateArray.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  useEffect(() => {
    setCategories(generateDateRange(startDate, endDate));
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/chart?start=${startDate}&end=${endDate}`
      );
      const { combinedResult } = response.data;

      // Assuming combinedResult is an array of objects with totalQuantity field
      const chartData = combinedResult.map(
        (item: { totalQuantity: number }) => item.totalQuantity
      );

      // Update dataChart with the processed data
      setDataChart(chartData);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Fetch data when startDate or endDate changes
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Update state when dataChart changes
  useEffect(() => {
    // Calculate the maximum value in dataChart
    const maxChartData = Math.max(...dataChart);

    // Update y-axis max value in options
    const updatedOptions = {
      ...options,
      yaxis: {
        ...options.yaxis,
        max: maxChartData > 10 ? maxChartData : 10, // Set max to maxChartData if greater than 20, otherwise keep it at 20
      },
    };

    // Update the options
    setOptions(updatedOptions);

    // Update state with the new options
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: dataChart,
        },
      ],
    }));
  }, [dataChart]);

  return (
    <div className="h-full w-full col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-[1.875rem] shadow-de dark:border-strokedark dark:bg-chartbody sm:px-[1.875rem] xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-[11.875rem]">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondarychart">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondarychart"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondarychart">
                Total Products Sales
              </p>
              <div className="flex gap-4">
                <div className="flex gap-4 items-center">
                  <label className="mr-2 text-sm">Start</label>
                  <div>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="mr-2">End</label>
                  <div>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={420}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
