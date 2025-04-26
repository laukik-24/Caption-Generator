import React from 'react';
import { HistoryItem } from '../types';
import { PLATFORMS, PLATFORM_ICONS } from '../constants';
import { Clock, Copy, Trash2 } from 'lucide-react';

interface GenerationHistoryProps {
  history: HistoryItem[];
  onCopyCaption: (caption: string) => void;
  onDeleteHistoryItem: (id: string) => void;
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  history,
  onCopyCaption,
  onDeleteHistoryItem
}) => {
  if (history.length === 0) {
    return null;
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="w-full mt-6">
      <div className="flex items-center mb-3">
        <Clock size={16} className="text-gray-600 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">Recent Generations</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {history.map((item) => {
          const platform = PLATFORMS[item.platform];
          const PlatformIcon = PLATFORM_ICONS[item.platform];
          
          return (
            <div 
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    <PlatformIcon size={14} color={platform.color} />
                  </div>
                  <span className="text-sm font-medium">{platform.name}</span>
                  {item.context && (
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full truncate max-w-[150px]">
                      {item.context}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{formatTime(item.timestamp)}</span>
              </div>
              
              <p className="text-sm text-gray-800 mb-2 line-clamp-2">{item.caption}</p>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => onCopyCaption(item.caption)}
                  className="text-xs flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Copy caption"
                >
                  <Copy size={12} className="mr-1" />
                  Copy
                </button>
                <button
                  onClick={() => onDeleteHistoryItem(item.id)}
                  className="text-xs flex items-center text-gray-600 hover:text-red-600 transition-colors"
                  aria-label="Delete from history"
                >
                  <Trash2 size={12} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenerationHistory;