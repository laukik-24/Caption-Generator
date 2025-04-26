import React from 'react';
import { Platform } from '../types';
import { PLATFORMS } from '../constants';

interface LoadingIndicatorProps {
  platform: Platform;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ platform }) => {
  const platformColor = PLATFORMS[platform].color;
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div 
          className="w-12 h-12 rounded-full animate-pulse"
          style={{ backgroundColor: `${platformColor}20` }}
        ></div>
        <div 
          className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-b-4 animate-spin"
          style={{ borderColor: platformColor }}
        ></div>
      </div>
      <p 
        className="mt-4 text-sm font-medium animate-pulse"
        style={{ color: platformColor }}
      >
        Generating caption for {platform}...
      </p>
    </div>
  );
};

export default LoadingIndicator;