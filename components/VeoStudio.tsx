
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface VeoStudioProps {
  isOpen: boolean;
  onClose: () => void;
}

const VeoStudio: React.FC<VeoStudioProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const checkAndOpenKey = async () => {
    // @ts-ignore
    if (!(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
    return true;
  };

  const generateVideo = async () => {
    if (!selectedImage) return;
    
    try {
      setIsGenerating(true);
      setVideoUrl(null);
      setStatusMessage('Initializing Cinematic Studio...');
      
      await checkAndOpenKey();
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = selectedImage.split(',')[1];
      
      setStatusMessage('Uploading assets to Veo...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Animate this fashion piece in a cinematic slow motion runway setting',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio
        }
      });

      const messages = [
        'Crafting cinematic motion...',
        'Refining fabric textures...',
        'Adjusting lighting and shadows...',
        'Finalizing render frames...',
        'Polishing the visual masterpiece...'
      ];
      
      let msgIndex = 0;
      while (!operation.done) {
        setStatusMessage(messages[msgIndex % messages.length]);
        msgIndex++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      setStatusMessage('Processing final video...');
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const fetchUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        setVideoUrl(fetchUrl);
      }
      setIsGenerating(false);
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      setStatusMessage('Generation failed. Please try again.');
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]">
        {/* Left Side: Upload & Config */}
        <div className="w-full md:w-1/2 p-8 border-r overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-black mb-2">Cinematic Studio</h2>
            <p className="text-sm text-gray-500">Transform your fashion stills into breathing masterpieces using Veo 3.1.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Source Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${selectedImage ? 'border-black' : 'border-gray-200 hover:border-gray-400'}`}
              >
                {selectedImage ? (
                  <img src={selectedImage} className="h-full w-full object-cover rounded-xl" alt="Selected" />
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2 text-gray-300"></i>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to upload photo</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Motion Prompt (Optional)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe how the image should move... e.g., 'Gently swaying in a breeze with soft lighting'"
                className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-black outline-none h-24 resize-none"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Aspect Ratio</label>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${aspectRatio === '16:9' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
                  >
                    16:9 Landscape
                  </button>
                  <button 
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${aspectRatio === '9:16' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
                  >
                    9:16 Portrait
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={generateVideo}
              disabled={isGenerating || !selectedImage}
              className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10"
            >
              {isGenerating ? 'Studio in Session...' : 'Generate Cinematic Motion'}
            </button>
            <p className="text-[10px] text-center text-gray-400">
              Note: Generation typically takes 2-3 minutes. <br />
              Please select a <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">paid API key</a> if prompted.
            </p>
          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col items-center justify-center relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-200 rounded-full transition-colors z-10">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          {!isGenerating && !videoUrl && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fa-solid fa-play text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-serif font-black">Video Preview</h3>
              <p className="text-sm text-gray-500 max-w-xs">Your cinematic generation will appear here once processed.</p>
            </div>
          )}

          {isGenerating && (
            <div className="text-center space-y-6 animate-pulse">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className="fa-solid fa-clapperboard text-black"></i>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-black uppercase tracking-widest">{statusMessage}</p>
                <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-black animate-[loading_2s_infinite]"></div>
                </div>
              </div>
            </div>
          )}

          {videoUrl && (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className={`w-full overflow-hidden rounded-2xl shadow-2xl bg-black ${aspectRatio === '9:16' ? 'max-w-[300px]' : ''}`}>
                <video src={videoUrl} controls autoPlay loop className="w-full h-auto" />
              </div>
              <a 
                href={videoUrl} 
                download="vogue-ai-generation.mp4"
                className="mt-8 flex items-center space-x-2 bg-white border border-gray-200 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <i className="fa-solid fa-download"></i>
                <span>Download Master</span>
              </a>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default VeoStudio;
