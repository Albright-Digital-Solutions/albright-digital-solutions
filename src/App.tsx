import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import ScrollToTop from './components/ScrollToTop';
import PageHead from './components/PageHead';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import AiAutomation from './pages/services/AiAutomation';
import WebDesign from './pages/services/WebDesign';
import VideoEditing from './pages/services/VideoEditing';
import WorkflowAudit from './pages/services/WorkflowAudit';
import DigitalInfrastructure from './pages/services/DigitalInfrastructure';
import AiTraining from './pages/services/AiTraining';
import PerformanceTuning from './pages/services/PerformanceTuning';
import QuoteBuilder from './pages/QuoteBuilder';
import ServiceFamily from './pages/ServiceFamily';

export function AppContent() {
  return (
    <>
      <CursorTrail />
      <ScrollToTop />
      <PageHead />
      <div
        className="flex flex-col min-h-screen bg-[var(--color-brand-dark)] text-zinc-300"
      >
        <Navbar />
        <main className="flex-1 pt-[146px]">
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
            <Route path="/services/:slug" element={<ServiceFamily />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/quote" element={<QuoteBuilder />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
