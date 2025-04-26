import PlatformSelector from "./components/PlatformSelector";
import CustomContextInput from "./components/CustomContextInput";
import CaptionDisplay from "./components/CaptionDisplay";
import LoadingIndicator from "./components/LoadingIndicator";
import GenerationHistory from "./components/GenerationHistory";
import { useCaptionGenerator } from "./hooks/useCaptionGenerator";
import { Wand2, AlertTriangle } from "lucide-react";

function App() {
  const {
    state: { loading, caption, error, history },
    selectedPlatform,
    setSelectedPlatform,
    context,
    setContext,
    generateCaption,
    copyToClipboard,
    deleteHistoryItem,
    // clearCaption
  } = useCaptionGenerator();

  const handleGenerate = () => {
    generateCaption();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-200 to-red-300 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row gap-8">
        {/* Left side: Search box */}
        <div className="flex-1 flex flex-col bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-md rounded-xl p-6 mb-8 border border-gray-200">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Platform Caption Generator
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Select a platform, add optional context, and generate perfect
              captions for your content
            </p>
          </header>

          <div className="space-y-4 flex-1">
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
            />

            <CustomContextInput
              context={context}
              onChange={setContext}
              onSubmit={handleGenerate}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
                <AlertTriangle size={16} className="text-red-500 mr-2 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>
          <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-purple-500 via-pink-400 to-red-500 flex items-center justify-center rounded-lg py-2.5 px-4 text-white font-medium transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700 active:transform active:scale-[0.98]"
                }`}
              >
                <Wand2 size={18} className="mr-2" />
                Generate Caption
              </button>
            </div>
        </div>

        {/* Right side: Result */}
        <div className="flex-1 bg-gradient-to-r from-white via-gray-100 to-gray-200 shadow-md rounded-xl p-6 mb-8 border border-gray-200 max-h-[80vh] overflow-y-auto">
          {loading ? (
            <LoadingIndicator platform={selectedPlatform} />
          ) : (
            caption && (
              <CaptionDisplay
                caption={caption}
                platform={selectedPlatform}
                context={context || undefined}
              />
            )
          )}

          <GenerationHistory
            history={history}
            onCopyCaption={copyToClipboard}
            onDeleteHistoryItem={deleteHistoryItem}
          />
        </div>
      </div>

      <footer className="text-center h-full text-sm text-gray-500 mt-8">
        <p>© 2025 Platform Caption Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
