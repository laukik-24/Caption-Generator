import React from "react";
import { Platform } from "../types";
import { PLATFORMS, PLATFORM_ICONS } from "../constants";
import { ChevronDown } from "lucide-react";

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelectPlatform,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (platform: Platform) => {
    onSelectPlatform(platform);
    setIsOpen(false);
  };

  const platform = PLATFORMS[selectedPlatform];
  const IconComponent = PLATFORM_ICONS[selectedPlatform];

  return (
    <div className="relative w-full sm:w-64 mb-4">
      <label
        htmlFor="platform-select"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Platform
      </label>
      <div
        className="relative"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="platform-select"
      >
        <button
          id="platform-select"
          onClick={toggleDropdown}
          className="bg-white w-full pl-3 pr-10 py-2 text-left border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
          style={{ borderColor: isOpen ? platform.color : undefined }}
        >
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
              style={{ backgroundColor: `${platform.color}20` }}
            >
              <IconComponent size={18} color={platform.color} />
            </div>
            <span className="font-medium">{platform.name}</span>
            <span className="text-xs text-gray-500 ml-2">
              ({platform.maxLength ? `${platform.maxLength} chars` : "No limit"}
              )
            </span>
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </span>
        </button>

        {isOpen && (
          <div
            className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg overflow-auto max-h-60 border border-gray-200 animate-in fade-in duration-200"
            role="listbox"
          >
            <ul className="py-1">
              {Object.entries(PLATFORMS).map(([key, platform]) => {
                const PlatformIcon =
                  PLATFORM_ICONS[key as keyof typeof PLATFORM_ICONS];
                return (
                  <li
                    key={key}
                    className="cursor-pointer select-none hover:bg-gray-50"
                    onClick={() => handleSelect(key as Platform)}
                    role="option"
                    aria-selected={selectedPlatform === key}
                  >
                    <div className="flex items-center px-3 py-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <PlatformIcon size={18} color={platform.color} />
                      </div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-xs text-gray-500">
                          {platform.description}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformSelector;
