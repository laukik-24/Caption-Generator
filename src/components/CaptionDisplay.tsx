import React, { useState } from 'react';
import { Platform } from '../types';
import { PLATFORMS } from '../constants';
import { Copy, Check, MessageSquare } from 'lucide-react';

interface CaptionDisplayProps {
  caption: string;
  platform: Platform;
  context?: string;
}

const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ 
  caption, 
  platform,
  context 
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const platformColor = PLATFORMS[platform].color;
  const maxLength = PLATFORMS[platform].maxLength || Infinity;
  const charCount = caption.length;
  const isNearLimit = maxLength && charCount > maxLength * 0.8;
  const isOverLimit = maxLength && charCount > maxLength;

  return (
    <div className="w-full mt-2 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <MessageSquare size={16} className="text-gray-500 mr-1" />
          <h3 className="text-sm font-medium text-gray-700">Generated Caption</h3>
        </div>
        {context && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            Context: {context}
          </span>
        )}
      </div>
      
      {caption ? (
        <div 
          className="relative bg-white border rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md"
          style={{ borderColor: `${platformColor}40` }}
        >
          <div 
            className="absolute top-0 left-0 h-1 rounded-t-lg transition-all duration-300"
            style={{ 
              backgroundColor: platformColor,
              width: `${Math.min((charCount / maxLength) * 100, 100)}%`,
              opacity: isNearLimit ? 1 : 0.7
            }}
          ></div>
          
          <p className="text-gray-800 whitespace-pre-wrap mb-3">{caption}</p>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span 
                className={`text-xs ${
                  isOverLimit 
                    ? 'text-red-500 font-medium' 
                    : isNearLimit 
                      ? 'text-amber-500' 
                      : 'text-gray-500'
                }`}
              >
                {charCount} / {maxLength === Infinity ? '∞' : maxLength} characters
              </span>
              {isOverLimit && (
                <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                  Exceeds limit
                </span>
              )}
            </div>
            
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                copied 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 bg-gray-50">
          Your generated caption will appear here
        </div>
      )}
    </div>
  );
};

export default CaptionDisplay;