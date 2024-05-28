'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

// Define the props for the FullscreenButton component
interface FullscreenButtonProps {
  targetRef: React.RefObject<HTMLDivElement>; // Ref object for the element to toggle fullscreen
}

// FullscreenButton component definition
const FullscreenButton: React.FC<FullscreenButtonProps> = ({ targetRef }) => {
  // State to track fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Effect to listen for changes to fullscreen mode
  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement); // Update state based on fullscreen status
    };

    // Add event listener for fullscreenchange event
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    // Cleanup: remove event listener
    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, []);

  // Function to handle toggling fullscreen mode
  const handleFullscreen = () => {
    if (targetRef.current) {
      // If not in fullscreen, request fullscreen for the target element
      if (!document.fullscreenElement) {
        targetRef.current.requestFullscreen();
      }
      // If already in fullscreen, exit fullscreen
      else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Render the fullscreen button
  return (
    <>
      <Button
        onClick={handleFullscreen}
        className="absolute top-2 right-2 p-2"
        variant="outline"
        size="icon"
      >
        {isFullscreen ? <Minimize2 /> : <Maximize2 />}{' '}
        {/* Display the appropriate icon based on fullscreen state */}
      </Button>
    </>
  );
};

export default FullscreenButton;
