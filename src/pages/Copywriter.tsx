import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Copy, Check, Terminal, Building2, Flame } from 'lucide-react';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function App() {
  const [requestText, setRequestText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestText }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate copy');
      }

      setResultText(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!resultText) return;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Auto-scroll to output on mobile when result arrives
  useEffect(() => {
    if (resultText && window.innerWidth < 1024 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [resultText]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-brand-dark)] text-zinc-300">
      
      {/* LEFT PANE - INPUT */}
      <main className="w-full lg:w-5/12 flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--color-brand-border)]">
        
        {/* Header */}
        <div className="p-8 pb-6 border-b border-[var(--color-brand-border)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[var(--color-brand-accent-dark)]/30 text-[var(--color-brand-accent)] p-2 rounded-lg">
              <Sparkles size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Albright AI</h1>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm mb-4">
            Elite B2B SaaS copywriting & brand strategy assistant.
          </p>
          
          <div className="flex gap-2 text-xs font-mono uppercase tracking-wider text-zinc-500">
            <span className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800"><Terminal size={12} /> Tech</span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800"><Building2 size={12} /> B2B</span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900 rounded-md border border-zinc-800"><Flame size={12} /> SaaS</span>
          </div>
        </div>

        {/* Form area */}
        <div className="p-8 flex-1 flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col h-full relative">
            <label htmlFor="prompt" className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider block">
              Describe your objective
            </label>
            
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--color-brand-accent-dark)]/50 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              
              <textarea
                id="prompt"
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="e.g., Write a 3-sequence cold email campaign targeting local businesses who need a custom AI agent to automate their customer support."
                className="relative w-full h-full min-h-[300px] lg:min-h-0 bg-[var(--color-brand-surface)] text-white placeholder-zinc-600 rounded-xl p-5 border border-[var(--color-brand-border)] focus:outline-none focus:border-[var(--color-brand-accent)]/50 resize-none transition-colors"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !requestText.trim()}
              className="mt-6 w-full group relative flex items-center justify-center gap-2 bg-white text-zinc-950 font-semibold py-4 px-6 rounded-xl overflow-hidden transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="z-10 relative">
                {isLoading ? 'Drafting Copy...' : 'Generate Copy'}
              </span>
              {!isLoading && <Send size={18} className="z-10 relative group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-950/40 text-red-400 border border-red-900/50 rounded-xl text-sm">
              {error}
            </div>
          )}
        </div>
      </main>

      {/* RIGHT PANE - OUTPUT */}
      <section ref={outputRef} className="w-full lg:w-7/12 flex flex-col bg-zinc-950 min-h-[500px] lg:min-h-screen relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }}></div>
        
        <header className="flex justify-between items-center p-6 lg:p-8 border-b border-[var(--color-brand-border)] sticky top-0 bg-zinc-950/80 backdrop-blur-md z-10">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Copy Variations
          </h2>
          
          <button
            onClick={copyToClipboard}
            disabled={!resultText || isLoading}
            className={cn(
              "p-2 rounded-lg border transition-all flex items-center gap-2 text-xs font-medium uppercase tracking-wide",
              copied 
                ? "bg-green-950/40 border-green-900/50 text-green-400" 
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-30"
            )}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy All'}</span>
          </button>
        </header>

        <div className="p-6 lg:p-12 overflow-y-auto flex-1 relative z-0">
          {!resultText && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto opacity-30 mt-20 lg:mt-0">
              <Sparkles size={48} className="mb-6 opacity-50" />
              <h3 className="font-serif text-2xl mb-3 text-white">The Canvas is Empty</h3>
              <p className="text-sm font-sans">
                Describe your objective on the left. The AI copywriter will generate compelling stylistic variations matching the Albright brand voice.
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center text-center mt-32 space-y-6 opacity-60">
              <span className="relative flex h-12 w-12">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-accent)]/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 bg-[var(--color-brand-accent)]/20 items-center justify-center border border-[var(--color-brand-accent)]/30">
                  <Sparkles size={24} className="text-[var(--color-brand-accent)] animate-pulse" />
                </span>
              </span>
              <p className="animate-pulse tracking-[0.2em] uppercase text-xs font-mono font-medium text-[var(--color-brand-accent)]">Crafting the hook...</p>
            </div>
          ) : (
             <div className="markdown-body prose prose-invert max-w-3xl prose-h1:font-serif prose-h2:font-serif prose-h3:font-serif prose-h4:font-serif prose-a:text-[var(--color-brand-accent-light)] prose-p:leading-relaxed prose-headings:font-normal prose-headings:tracking-tight relative">
                <Markdown>{resultText}</Markdown>
             </div>
          )}
        </div>
        
      </section>
      
    </div>
  );
}

