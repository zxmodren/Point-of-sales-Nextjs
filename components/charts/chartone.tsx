'use client';
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { initialChartoneOptions } from '@/lib/charts';

// Dynamically import ReactApexChart for client-side rendering only
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

// Get today's date
const today = new Date();

// Calculate one week from today
const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

// Format dates as yyyy-mm-dd strings
const startDateString = today.toISOString().split('T')[0];
const endDateString = oneWeekFromNow.toISOString().split('T')[0];

const ChartOne: React.FC = () => {
  // State for chart data
  const [dataChart, setDataChart] = useState<number[]>([]);
  // State for start and end dates
  const [startDate, setStartDate] = useState<string>('2024-05-01');
  const [endDate, setEndDate] = useState<string>('2024-05-15');

  // State for chart options and series
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Products Sales',
        data: [],
      },
    ],
    options: initialChartoneOptions,
  });

  // Function to generate an array of date strings between start and end dates
  const generateDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray: string[] = [];
    let currentDate = startDate;

    // Check if dates are in the same month and year
    const isSameMonth =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth();
    const isSameYear = startDate.getFullYear() === endDate.getFullYear();

    // Generate date strings based on conditions
    while (currentDate <= endDate) {
      let formattedDate: string;

      if (!isSameYear) {
        formattedDate = currentDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      } else if (!isSameMonth) {
        formattedDate = currentDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
      } else {
        formattedDate = currentDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        });
      }

      if (!dateArray.includes(formattedDate)) {
        dateArray.push(formattedDate);
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  // Update chart x-axis categories when startDate or endDate changes
  useEffect(() => {
    const newCategories = generateDateRange(startDate, endDate);

    setState((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: newCategories,
        },
      },
    }));
  }, [startDate, endDate]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/productsale?start=${startDate}&end=${endDate}`
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

  // Update chart series data when dataChart changes
  useEffect(() => {
    if (dataChart.length > 0) {
      const maxChartData = Math.max(...dataChart) + 1;

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: dataChart,
          },
        ],
        options: {
          ...prevState.options,
          yaxis: {
            ...prevState.options.yaxis,
            max: maxChartData,
          },
        },
      }));
    }
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
                      className="h-8"
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
                      className="h-8"
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
            options={state.options}
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
