import { useState, useCallback } from 'react';
import { Platform, GeneratorState, HistoryItem } from '../types';
import { generateCaption } from '../services/geminiService';
import { LOADING_DELAY } from '../constants';

export const useCaptionGenerator = () => {
  const [state, setState] = useState<GeneratorState>({
    loading: false,
    caption: '',
    error: null,
    history: []
  });
  
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('Instagram');
  const [context, setContext] = useState('');

  const generateCaptionHandler = useCallback(async () => {
    // Set loading state
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Simulate minimum loading time for better UX
      const response = await generateCaption(selectedPlatform, context);
      
      // Ensure we show loading state for at least LOADING_DELAY ms
      const startTime = Date.now();
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, LOADING_DELAY - elapsedTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }
      
      if (response.error) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: response.error ?? null
        }));
        return;
      }
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        platform: selectedPlatform,
        context,
        caption: response.caption,
        timestamp: Date.now()
      };
      
      setState(prev => ({
        ...prev,
        loading: false,
        caption: response.caption,
        history: [newHistoryItem, ...prev.history.slice(0, 4)] // Keep last 5 items
      }));
    } catch (err) {
      console.error('Error generating caption:', err);
      setState(prev => ({ 
        ...prev, 
        loading: false,
        error: 'Failed to generate caption. Please try again.' 
      }));
    }
  }, [selectedPlatform, context]);

  const copyToClipboard = useCallback(async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      history: prev.history.filter(item => item.id !== id)
    }));
  }, []);

  const clearCaption = useCallback(() => {
    setState(prev => ({ ...prev, caption: '', error: null }));
  }, []);

  return {
    state,
    selectedPlatform,
    setSelectedPlatform,
    context,
    setContext,
    generateCaption: generateCaptionHandler,
    copyToClipboard,
    deleteHistoryItem,
    clearCaption
  };
};