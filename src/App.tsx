import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import CursorTrail from './components/CursorTrail';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Copywriter from './pages/Copywriter';
import AiAutomation from './pages/services/AiAutomation';
import WebDesign from './pages/services/WebDesign';
import VideoEditing from './pages/services/VideoEditing';
import WorkflowAudit from './pages/services/WorkflowAudit';
import DigitalInfrastructure from './pages/services/DigitalInfrastructure';
import AiTraining from './pages/services/AiTraining';
import PerformanceTuning from './pages/services/PerformanceTuning';

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Only show intro once per session
    return !sessionStorage.getItem('albright_intro_seen');
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('albright_intro_seen', 'true');
    setShowIntro(false);
  };

  // Lock scroll during intro
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showIntro]);

  return (
    <>
      <CursorTrail />
      <Router>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        className="flex flex-col min-h-screen bg-[var(--color-brand-dark)] text-zinc-300"
        style={{
          opacity: showIntro ? 0 : 1,
          transition: 'opacity 0.6s ease-in',
        }}
      >
        <Navbar />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-automation" element={<AiAutomation />} />
            <Route path="/services/web-design" element={<WebDesign />} />
            <Route path="/services/video-editing" element={<VideoEditing />} />
            <Route path="/services/workflow-audit" element={<WorkflowAudit />} />
            <Route path="/services/digital-infrastructure" element={<DigitalInfrastructure />} />
            <Route path="/services/ai-training" element={<AiTraining />} />
            <Route path="/services/performance-tuning" element={<PerformanceTuning />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/copywriter" element={<Copywriter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </>
  );
}
