import React from 'react';
import { Sparkles } from 'lucide-react';

interface CustomContextInputProps {
  context: string;
  onChange: (context: string) => void;
  onSubmit: () => void;
}

const CustomContextInput: React.FC<CustomContextInputProps> = ({
  context,
  onChange,
  onSubmit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="w-full mb-4">
      <label 
        htmlFor="custom-context" 
        className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
      >
        <Sparkles size={16} className="text-purple-500 mr-1" />
        Add Context (optional)
      </label>
      <div className="relative rounded-lg shadow-sm">
        <input
          type="text"
          id="custom-context"
          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-3 pr-12 py-2 sm:text-sm border border-gray-300 rounded-lg transition-colors duration-200"
          placeholder="E.g., beach vacation, new product launch, fitness journey..."
          value={context}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-400 text-xs">Optional</span>
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Add context to make your caption more personalized
      </p>
    </div>
  );
};

export default CustomContextInput;