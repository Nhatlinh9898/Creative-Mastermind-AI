
import React, { useState, useEffect } from 'react';
import { Domain, AppState } from './types';
import { 
  DOMAIN_TOPICS, 
  TONE_VOICES, 
  MUSIC_STYLES, 
  AESTHETIC_STYLES, 
  SETTING_STYLES, 
  VOICE_STYLES, 
  ABILITIES, 
  GENRES 
} from './constants';
import Header from './components/Header';
import VoiceStudio from './components/VoiceStudio';
import { gemini } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    domain: Domain.TECH,
    topic: DOMAIN_TOPICS[Domain.TECH][0],
    targetAudience: '',
    tone: TONE_VOICES[0],
    additionalDetails: '',
    musicStyle: MUSIC_STYLES[0],
    aestheticStyle: AESTHETIC_STYLES[0],
    settingStyle: SETTING_STYLES[0],
    voiceStyle: VOICE_STYLES[0],
    characterAbilities: ABILITIES[0],
    scriptGenre: GENRES[0],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Update topic when domain changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      topic: DOMAIN_TOPICS[prev.domain][0]
    }));
  }, [state.domain]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await gemini.generateContent(state);
      setResult(content);
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("Đã có lỗi xảy ra trong quá trình kiến tạo.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isScriptTopic = state.topic.toLowerCase().includes('kịch bản');

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      <Header />

      <main className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Configuration */}
          <section className="lg:col-span-5 space-y-8">
            <div className="glass-morphism p-8 rounded-[2.5rem] bg-glow border-white/5 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                CẤU HÌNH HỆ THỐNG
              </h2>

              {/* Domain Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Lĩnh vực</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(Domain).map(d => (
                    <button
                      key={d}
                      onClick={() => setState({ ...state, domain: d })}
                      className={`px-4 py-3 rounded-2xl text-left transition-all border ${state.domain === d ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Chủ đề chuyên sâu</label>
                <select
                  value={state.topic}
                  onChange={(e) => setState({ ...state, topic: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                >
                  {DOMAIN_TOPICS[state.domain].map(t => (
                    <option key={t} value={t} className="bg-neutral-900">{t}</option>
                  ))}
                </select>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Đối tượng mục tiêu</label>
                <input
                  type="text"
                  placeholder="VD: Người mới bắt đầu, Chuyên gia CTO, Gen Z..."
                  value={state.targetAudience}
                  onChange={(e) => setState({ ...state, targetAudience: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Tone of Voice */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tone giọng</label>
                <select
                  value={state.tone}
                  onChange={(e) => setState({ ...state, tone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {TONE_VOICES.map(v => <option key={v} value={v} className="bg-neutral-900">{v}</option>)}
                </select>
              </div>

              {/* Additional Details */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Yêu cầu bổ sung</label>
                <textarea
                  rows={4}
                  placeholder="Ghi chú thêm về nội dung bạn mong muốn..."
                  value={state.additionalDetails}
                  onChange={(e) => setState({ ...state, additionalDetails: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !state.targetAudience}
                className={`w-full py-5 rounded-3xl font-black text-xl tracking-tighter shadow-2xl transition-all flex items-center justify-center gap-3 ${isGenerating || !state.targetAudience ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-95 text-white'}`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ĐANG KIẾN TẠO...
                  </>
                ) : (
                  <>KIẾN TẠO NỘI DUNG</>
                )}
              </button>
            </div>
          </section>

          {/* Script Options / Result Area */}
          <section className="lg:col-span-7 space-y-8">
            {isScriptTopic && (
              <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5 animate-in fade-in slide-in-from-right duration-500">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-gradient">Script Customizer (Super Prompt)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phong cách âm nhạc</label>
                    <select 
                      onChange={(e) => setState({...state, musicStyle: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {MUSIC_STYLES.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phong cách thẩm mỹ</label>
                    <select 
                      onChange={(e) => setState({...state, aestheticStyle: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {AESTHETIC_STYLES.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Bối cảnh</label>
                    <select 
                      onChange={(e) => setState({...state, settingStyle: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {SETTING_STYLES.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Giọng nói</label>
                    <select 
                      onChange={(e) => setState({...state, voiceStyle: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      {VOICE_STYLES.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            <div id="result-section" className="min-h-[400px]">
              {!result && !isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-12 glass-morphism rounded-[2.5rem] border-dashed border-2 border-white/10">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.691.34a6 6 0 01-3.86.517l-2.388-.477a2 2 0 00-1.022.547l-1.162 1.626a2 2 0 00.339 2.748l1.53 1.23a2 2 0 002.73-.268l.965-.965a2 2 0 011.833-.566l1.435.353a2 2 0 001.37-.081l1.2-.6a2 2 0 00.787-1.575v-.327c0-.11.003-.22.01-.33a10.015 10.015 0 003.94-4.612c.096-.247.156-.509.182-.778l.015-.214a1 1 0 01.993-.944H21a1 1 0 00.894-1.447l-2-4A1 1 0 0019 3h-3a1 1 0 00-.894.553l-2 4a1 1 0 01-.894.553H7.894a1 1 0 01-.894-.553l-2-4A1 1 0 004 3H1a1 1 0 00-.894.553l-2 4A1 1 0 01-2.788 8H-5.106a1 1 0 01-.894.553l-2 4A1 1 0 00-7 14h3a1 1 0 00.894-.553l2-4a1 1 0 01.894-.553h5.212a1 1 0 01.894.553l2 4a1 1 0 00.894.553h3z"></path></svg>
                  </div>
                  <h4 className="text-xl font-bold text-gray-500 mb-2">Sẵn sàng kiến tạo nội dung</h4>
                  <p className="text-gray-600 max-w-sm">Chọn lĩnh vực và chủ đề bên trái để bắt đầu quá trình sáng tạo.</p>
                </div>
              ) : result ? (
                <div className="space-y-6 animate-in fade-in zoom-in duration-700">
                  <div className="p-10 glass-morphism rounded-[2.5rem] border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                      <button 
                        onClick={() => navigator.clipboard.writeText(result)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-indigo-400 transition-colors"
                        title="Sao chép"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      </button>
                    </div>
                    <div className="prose prose-invert max-w-none prose-indigo">
                      <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed text-base">
                        {result}
                      </pre>
                    </div>
                  </div>

                  <VoiceStudio content={result} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-20 glass-morphism rounded-[2.5rem]">
                   <div className="relative w-32 h-32 mb-8">
                     <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                     <div className="absolute inset-4 bg-indigo-500/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-black text-indigo-400">AI</span>
                     </div>
                   </div>
                   <h3 className="text-2xl font-bold mb-4 animate-pulse">Neural System is working...</h3>
                   <p className="text-gray-500 text-center max-w-xs">Đang phân tích bối cảnh và kiến tạo nội dung thực chiến cho bạn.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-32 py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>&copy; 2024 CREATIVE MASTERMIND AI - Powered by Linh Master AI Core.</p>
        <p className="mt-2 font-mono tracking-tighter opacity-50">VER 32.0 - HYPER-CONTEXT ENGINE ENABLED</p>
      </footer>
    </div>
  );
};

export default App;
