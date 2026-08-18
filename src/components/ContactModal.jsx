import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function ContactModal({ isOpen, onClose }) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    let ctx;
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
      
      // GSAP Entrance animation
      ctx = gsap.context(() => {
        gsap.fromTo(modalRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      });
    } else {
      if (isMounted && modalRef.current) {
        ctx = gsap.context(() => {
          gsap.to(modalRef.current, {
            y: 30, opacity: 0, duration: 0.4, ease: "power3.in",
            onComplete: () => setIsMounted(false)
          });
        });
      }
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (ctx) ctx.revert();
    };
  }, [isOpen]);

  if (!isMounted && !isOpen) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-xl max-h-[95dvh] overflow-y-auto bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl opacity-0"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-accent transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className="text-3xl font-serif font-bold text-white mb-2">Démarrer un projet</h3>
        <p className="text-white/60 font-light mb-8">
          Envoyez-moi un message rapide et je vous répondrai dans les plus brefs délais.
        </p>

        <form action="https://formspree.io/f/xkjwpwzz" method="POST" className="space-y-8">
          <div className="relative group">
            <input 
              type="text" 
              name="name" 
              id="modal-name" 
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-accent transition-colors placeholder-transparent"
            />
            <label htmlFor="modal-name" className="absolute left-0 top-4 text-white/50 text-lg font-light pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/50">
              Quel est votre nom ?
            </label>
          </div>

          <div className="relative group">
            <input 
              type="email" 
              name="email" 
              id="modal-email" 
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-accent transition-colors placeholder-transparent"
            />
            <label htmlFor="modal-email" className="absolute left-0 top-4 text-white/50 text-lg font-light pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/50">
              Votre adresse email
            </label>
          </div>

          <div className="relative group">
            <textarea 
              name="message" 
              id="modal-message" 
              required
              rows="4"
              placeholder=" "
              className="peer w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:outline-none focus:border-accent transition-colors placeholder-transparent resize-none"
            ></textarea>
            <label htmlFor="modal-message" className="absolute left-0 top-4 text-white/50 text-lg font-light pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-valid:-top-3 peer-valid:text-xs peer-valid:text-white/50">
              Parlez-moi de votre projet...
            </label>
          </div>

          <button 
            type="submit"
            className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-background font-semibold rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,168,204,0.4)] active:scale-95 mt-4"
          >
            <div className="absolute inset-0 bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <span className="relative z-10">Envoyer le message</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-center text-white/40 text-sm mb-4">Ou écrivez-moi directement sur</p>
          <div className="flex justify-center gap-4">
            {[
              {
                name: "WhatsApp",
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.552 4.125 1.522 5.892L.48 24l6.236-1.636a11.96 11.96 0 0 0 5.315 1.251h.005c6.641 0 12.025-5.385 12.025-12.031A12.04 12.04 0 0 0 12.031 0zm0 21.606h-.003a9.98 9.98 0 0 1-5.088-1.385l-.365-.217-3.782.991.996-3.69-.238-.378A9.954 9.954 0 0 1 2.008 12.03c0-5.522 4.492-10.019 10.024-10.019 2.673 0 5.187 1.042 7.078 2.934 1.892 1.892 2.935 4.407 2.935 7.085 0 5.522-4.495 10.019-10.023 10.019zm5.5-7.518c-.301-.151-1.782-.879-2.059-.979-.278-.1-.479-.151-.68.151-.202.302-.781.979-.958 1.18-.176.202-.353.227-.655.076-.301-.151-1.272-.469-2.423-1.498-.895-.8-1.501-1.788-1.677-2.09-.176-.301-.019-.464.132-.614.135-.135.301-.352.452-.529.151-.176.202-.301.302-.503.101-.202.051-.378-.025-.529-.076-.151-.68-1.638-.931-2.242-.245-.59-.494-.51-.68-.52-.176-.008-.378-.008-.58-.008-.202 0-.529.076-.805.378-.278.302-1.058 1.033-1.058 2.518 0 1.485 1.083 2.921 1.234 3.122.151.202 2.13 3.25 5.158 4.554.721.312 1.282.497 1.721.637.724.23 1.385.197 1.905.12.585-.087 1.782-.728 2.034-1.431.251-.703.251-1.306.176-1.431-.076-.126-.278-.202-.58-.353z"/></svg>,
                url: "https://wa.me/237692885988"
              },
              {
                name: "LinkedIn",
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                url: "https://www.linkedin.com/in/williamsbiamou"
              },
              {
                name: "TikTok",
                icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
                url: "https://www.tiktok.com/@williams_biamou?is_from_webapp=1&sender_device=pc"
              }
            ].map((social, index) => (
              <a 
                key={index} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-background hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
