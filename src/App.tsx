import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import Menu from './sections/Menu';
import Builder from './sections/Builder';
import WhyUs from './sections/WhyUs';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CartModal from './components/CartModal';
import PaymentModal from './components/PaymentModal';
import Toast from './components/Toast';
import Particles from './components/Particles';
import { CartProvider } from './context/CartContext';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // GSAP animations for hero
    const ctx = gsap.context(() => {
      gsap.from('.hero-title-char', {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.05,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: 0.3
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
      });

      gsap.from('.hero-price', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(2)',
        delay: 1.2
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  return (
    <CartProvider>
      <div ref={mainRef} className="relative min-h-screen overflow-x-hidden">
        {/* Animated Background */}
        <div className="animated-bg">
          <div className="gradient-orb orb-1" />
          <div className="gradient-orb orb-2" />
          <div className="gradient-orb orb-3" />
          <div className="gradient-orb orb-4" />
        </div>

        {/* Particles */}
        <Particles />

        {/* Navigation */}
        <Navigation onCartClick={() => setCartModalOpen(true)} />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <Marquee />
          <Menu showToast={showToast} />
          <Builder showToast={showToast} />
          <WhyUs />
          <CTA />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals */}
        <CartModal 
          isOpen={cartModalOpen} 
          onClose={() => setCartModalOpen(false)}
          onCheckout={() => {
            setCartModalOpen(false);
            setPaymentModalOpen(true);
          }}
        />
        
        <PaymentModal 
          isOpen={paymentModalOpen} 
          onClose={() => setPaymentModalOpen(false)}
        />

        {/* Toast */}
        <Toast show={toast.show} message={toast.message} />
      </div>
    </CartProvider>
  );
}

export default App;
