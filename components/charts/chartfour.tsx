'use client';
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { initialChartfourOptions } from '@/lib/charts';

// Dynamically import ReactApexChart with SSR disabled
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Define the state interface for ChartOne
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

const ChartFour: React.FC = () => {
  // State for chart data and date range
  const [dataChart, setDataChart] = useState<{
    [date: string]: {
      netIncome: number;
      taxIncome: number;
      grossIncomeWithTax: number;
    };
  }>({});
  const [startDate, setStartDate] = useState<string>('2024-05-01');
  const [endDate, setEndDate] = useState<string>('2024-05-15');

  // State for the chart options and series
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Net Income',
        data: [44, 55, 41, 67, 22],
      },
      {
        name: 'Tax',
        data: [22, 31, 30, 12, 20],
      },
      {
        name: 'Gross Income With Tax',
        data: [50, 70, 60, 80, 40],
      },
    ],
    options: initialChartfourOptions,
  });

  // Function to generate an array of dates within a range
  const generateDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray: string[] = [];
    let currentDate = startDate;

    const isSameMonth =
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth();
    const isSameYear = startDate.getFullYear() === endDate.getFullYear();

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

  // Update chart categories when start or end date changes
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

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/profit?start=${startDate}&end=${endDate}`
      );
      // Convert array data to object format
      const formattedData = response.data.groupedData.reduce(
        (
          acc: {
            [date: string]: {
              netIncome: number;
              taxIncome: number;
              grossIncomeWithTax: number;
            };
          },
          curr: {
            date: string;
            netIncome: number;
            taxIncome: number;
            grossIncomeWithTax: number;
          }
        ) => {
          acc[curr.date] = {
            netIncome: curr.netIncome,
            taxIncome: curr.taxIncome,
            grossIncomeWithTax: curr.grossIncomeWithTax,
          };
          return acc;
        },
        {}
      );

      setDataChart(formattedData);
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
    if (Object.keys(dataChart).length > 0) {
      const netIncomeData = Object.values(dataChart).map((entry) =>
        Number(entry.netIncome.toFixed(1))
      );
      const taxIncomeData = Object.values(dataChart).map((entry) =>
        Number(entry.taxIncome.toFixed(1))
      );
      const grossIncomeWithTaxData = Object.values(dataChart).map((entry) =>
        Number(entry.grossIncomeWithTax.toFixed(1))
      );
      const maxChartData = Math.max(...grossIncomeWithTaxData) + 1;

      setState((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: netIncomeData,
          },
          {
            ...prevState.series[1],
            data: taxIncomeData,
          },
          {
            ...prevState.series[2],
            data: grossIncomeWithTaxData,
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
            <div className="w-full">
              <p className="font-semibold text-[#3f4]">Income</p>
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
            type="line"
            height={420}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
