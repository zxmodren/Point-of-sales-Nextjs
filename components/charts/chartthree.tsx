'use client';
import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { initialChartThreeOptions } from '@/lib/charts';

// Dynamically import ReactApexChart for client-side rendering only
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface ChartThreeState {
  series: {
    name: string;
    data: number[];
  }[];
  options: ApexOptions;
}

// Define Product and TopProductResponse types
type Product = {
  name: string;
};

type TopProductResponse = {
  topProducts: {
    id: string;
    productId: string;
    productstock: Product;
    _sum: {
      quantity: number;
    };
  }[];
  totalQuantity: number;
};

const ChartThree: React.FC = () => {
  // State to store the top products data
  const [topProducts, setTopProducts] = useState<
    TopProductResponse['topProducts']
  >([]);
  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);
  // State to store the total quantity of products sold
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  // State to manage the chart options and series data
  const [state, setState] = useState<ChartThreeState>({
    series: [
      {
        name: 'Sales',
        data: [],
      },
    ],
    options: initialChartThreeOptions,
  });

  // useEffect to fetch top products data from the API
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get<TopProductResponse>('/api/favorite');
        // Store the top products data in state
        setTopProducts(response.data.topProducts);
        // Store the total quantity in state
        setTotalQuantity(response.data.totalQuantity);

        // Map the quantities to a new array for chart data
        const newData = response.data.topProducts.map(
          (product) => product._sum.quantity
        );
        // Map the product names to a new array for chart categories
        const newCategories = response.data.topProducts.map(
          (product) => product.productstock.name
        );

        // Calculate the maximum quantity for the y-axis and add 1
        const maxQuantity = Math.max(...newData) + 1;

        // Update the chart state with the new data and categories
        setState((prevState) => ({
          ...prevState,
          series: [
            {
              name: 'Total Sales',
              data: newData,
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              categories: newCategories,
            },
            yaxis: {
              ...prevState.options.yaxis,
              max: maxQuantity,
            },
          },
        }));
      } catch (error: any) {
        // Set error message if the API call fails
        setError(error.message);
      } finally {
        // Set loading to false once the API call is complete
        setLoading(false);
      }
    };

    // Call the fetchTopProducts function
    fetchTopProducts();
  }, []);

  return (
    <div className="h-full w-full col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-[1.875rem] shadow-de dark:border-strokedark dark:bg-chartbody sm:px-[1.875rem] xl:col-span-8">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Top 5 Favorite Product
          </h4>
        </div>
      </div>

      <div>
        <div id="chartThree" className="-mb-9 -ml-5">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height={450}
            width={'100%'}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
