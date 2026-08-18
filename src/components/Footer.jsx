import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-sm font-light">
          © {new Date().getFullYear()} Williams Biamou. Tous droits réservés.
        </p>
        <div className="flex gap-6 text-white/30 text-sm font-light">
          <span className="cursor-default">Mentions légales</span>
          <span className="cursor-default">Politique de confidentialité</span>
        </div>
      </div>
    </footer>
  );
}
