'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function WeatherComponent(): React.ReactNode {
  // State variables to store weather data and icon URL
  const [weather, setWeather] = useState<any>(null);
  const [iconUrl, setIconUrl] = useState<string>('');

  // API key for accessing weather data
  const apiKey = process.env.WEATHER_API; // Replace with your API key

  // Skeleton component to display loading animation
  const Skeleton = () => {
    const variants = {
      initial: {
        width: 0,
      },
      animate: {
        width: '100%',
        transition: {
          duration: 0.2,
        },
      },
      hover: {
        width: ['0%', '100%'],
        transition: {
          duration: 2,
        },
      },
    };
    const arr = new Array(6).fill(0);
    return (
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
      >
        {arr.map((_, i) => (
          <motion.div
            key={'skelenton-two' + i}
            variants={variants}
            style={{
              maxWidth: Math.random() * (100 - 40) + 40 + '%',
            }}
            className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"
          ></motion.div>
        ))}
      </motion.div>
    );
  };

  useEffect(() => {
    // Fetch weather data from OpenWeatherMap API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Jakarta,ID&appid=${apiKey}&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Set weather data and icon URL
        setWeather(data);
        const iconCode = data.weather[0].icon;
        setIconUrl(`http://openweathermap.org/img/wn/${iconCode}.png`);
      })
      .catch((error) => {
        // Handle errors
        toast.error(`${error.message}`);
      });
  }, [apiKey]);

  // Display skeleton loading animation if weather data is not available yet
  if (!weather) {
    return <Skeleton />;
  }

  // Render weather component with fetched data
  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-gray-400  dark:bg-black">
      <div className="flex flex-col items-center text-neutral-800 dark:text-neutral-200 font-roboto">
        <div className="text-3xl font-bold">{weather.name}</div>
        <div className="text-xl">{weather.weather[0].description}</div>
        <div className="flex items-center">
          <div className="w-10 h-10 mr-2">
            <Image src={iconUrl} alt="Weather Icon" width={40} height={40} />
          </div>
          <div className="text-4xl font-bold">
            {Math.round(weather.main.temp)}°C
          </div>
        </div>
        <div className="flex">
          <div className="mr-2">
            <strong>Min:</strong> {Math.round(weather.main.temp_min)}°C
          </div>
          <div>
            <strong>Max:</strong> {Math.round(weather.main.temp_max)}°C
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComponent;
