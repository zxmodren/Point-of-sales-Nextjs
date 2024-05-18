"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface FullscreenButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ targetRef }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", fullscreenChangeHandler);

    return () => {
      document.removeEventListener("fullscreenchange", fullscreenChangeHandler);
    };
  }, []);

  const handleFullscreen = () => {
    if (targetRef.current) {
      if (!document.fullscreenElement) {
        targetRef.current.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleFullscreen}
        className="absolute top-2 right-2 p-2"
        variant="outline"
        size="icon">
        {isFullscreen ? <Minimize2 /> : <Maximize2 />}
      </Button>
    </>
  );
};

export default FullscreenButton;
