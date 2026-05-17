import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Copywriter from './pages/Copywriter';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[var(--color-brand-dark)] text-zinc-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/copywriter" element={<Copywriter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
