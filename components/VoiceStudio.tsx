
import React, { useState, useRef } from 'react';
import { gemini } from '../services/geminiService';

interface VoiceStudioProps {
  content: string;
}

const VoiceStudio: React.FC<VoiceStudioProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voice, setVoice] = useState<'Kore' | 'Puck'>('Kore');
  const [speed, setSpeed] = useState(1.0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const playVoice = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    setLoading(true);
    try {
      const base64 = await gemini.generateSpeech(content, voice, speed);
      const audioBytes = decode(base64);
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioContextRef.current;
      const buffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      
      sourceRef.current = source;
      source.start();
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo giọng nói.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-6 glass-morphism rounded-3xl border-indigo-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight uppercase">Voice Studio Pro</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Giọng đọc</label>
          <div className="flex gap-2">
            <button 
              onClick={() => setVoice('Kore')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${voice === 'Kore' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Nam (Trầm ấm)
            </button>
            <button 
              onClick={() => setVoice('Puck')}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${voice === 'Puck' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Nữ (Truyền cảm)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Tốc độ ({speed}x)</label>
          <input 
            type="range" min="0.5" max="2.0" step="0.5" 
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      <button
        onClick={playVoice}
        disabled={loading}
        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''} ${isPlaying ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'}`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
        ) : isPlaying ? (
          <>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"></path></svg>
            Dừng phát
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
            Nghe nội dung ngay
          </>
        )}
      </button>
    </div>
  );
};

export default VoiceStudio;
