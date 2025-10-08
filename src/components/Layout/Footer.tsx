import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-white text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="relative flex items-center justify-center w-auto">
                <img 
                  src="https://i.ibb.co/LdQvZzHs/Capture-d-e-cran-2025-07-07-a-16-42-22.png" 
                  alt="Hijra.fr Logo" 
                  className="h-12 w-auto max-w-none"
                  style={{ 
                    objectFit: 'contain', 
                    maxHeight: '48px',
                    width: 'auto',
                    minWidth: '90px'
                  }}
                  onError={(e) => {
                    // Fallback to local image if external URL fails
                    e.currentTarget.src = "/Capture d'écran 2024-07-10 à 16.14.36.png";
                  }}
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Votre plateforme de confiance pour un accompagnement personnalisé dans votre projet d'expatriation vers les terres d'Islam.
            </p>
            <div className="flex space-x-4">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-300">contact@hijra.fr</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-brand-green transition-colors">
                  Guides par destination
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-brand-green transition-colors">
                  Offres d'emploi
                </Link>
              </li>
              <li>
                <Link to="/assistance" className="text-gray-300 hover:text-brand-green transition-colors">
                  Assistance personnalisée
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-brand-green transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/entrepreneurship" className="text-gray-300 hover:text-brand-green transition-colors">
                  Entrepreneuriat
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations populaires</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations/qatar" className="text-gray-300 hover:text-brand-green transition-colors">
                  Qatar
                </Link>
              </li>
              <li>
                <Link to="/destinations/uae" className="text-gray-300 hover:text-brand-green transition-colors">
                  Émirats Arabes Unis
                </Link>
              </li>
              <li>
                <Link to="/destinations/morocco" className="text-gray-300 hover:text-brand-green transition-colors">
                  Maroc
                </Link>
              </li>
              <li>
                <Link to="/destinations/malaysia" className="text-gray-300 hover:text-brand-green transition-colors">
                  Malaisie
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Hijra.fr. Tous droits réservés.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-brand-green text-sm transition-colors">
              Confidentialité
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-brand-green text-sm transition-colors">
              Conditions
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-brand-green text-sm transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;