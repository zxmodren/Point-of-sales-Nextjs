'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

interface NetworkInformation {
  effectiveType: string;
  downlink: number;
}

// Extend the Navigator type to include the connection property
interface NavigatorConnection extends Navigator {
  connection?: {
    effectiveType: string;
    downlink: number;
    addEventListener: (
      type: string,
      listener: EventListenerOrEventListenerObject
    ) => void;
    removeEventListener: (
      type: string,
      listener: EventListenerOrEventListenerObject
    ) => void;
  };
}

const getNetworkQuality = (downlink: number, effectiveType: string) => {
  if (effectiveType === '4g' && downlink > 2) {
    return 'good';
  }
  return 'poor';
};

function NetworkSpeed() {
  const [networkInfo, setNetworkInfo] = useState<NetworkInformation | null>(
    null
  );
  const [networkQuality, setNetworkQuality] = useState<'good' | 'poor'>('poor');

  useEffect(() => {
    const updateNetworkInfo = () => {
      const nav = navigator as NavigatorConnection;
      if (nav.connection) {
        const info = {
          effectiveType: nav.connection.effectiveType,
          downlink: nav.connection.downlink,
        };
        setNetworkInfo(info);
        setNetworkQuality(getNetworkQuality(info.downlink, info.effectiveType));
      }
    };

    updateNetworkInfo();

    const nav = navigator as NavigatorConnection;
    if (nav.connection) {
      nav.connection.addEventListener('change', updateNetworkInfo);
    }

    return () => {
      if (nav.connection) {
        nav.connection.removeEventListener('change', updateNetworkInfo);
      }
    };
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-gray-400/[0.7] dark:bg-black">
      <motion.div
        className="text-2xl font-medium font-roboto flex items-center"
        style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.7)' }}
        animate={{ color: networkQuality === 'good' ? '#00CC19' : '#FF0000' }}
        transition={{ duration: 0.5 }}
      >
        <Wifi className="mr-2" />
        {networkInfo ? (
          <div>
            <p>Effective Type: {networkInfo.effectiveType}</p>
            <p>Downlink: {networkInfo.downlink} Mbps</p>
          </div>
        ) : (
          <p>Loading network info...</p>
        )}
      </motion.div>
    </div>
  );
}

export default NetworkSpeed;
