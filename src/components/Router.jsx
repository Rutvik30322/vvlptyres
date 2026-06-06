import { useState, useEffect } from 'react';

/**
 * Custom hook to manage hash-based routing.
 * Supported hash paths:
 * - '#/' -> home
 * - '#/products' -> products
 * - '#/services' -> services
 * - '#/gallery' -> gallery
 * - '#/contact' -> contact
 */
export function useHashRouter() {
  const getHash = () => window.location.hash || '#/';
  
  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash());
      // Scroll to top of the page when changing routes
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (to) => {
    window.location.hash = to;
  };

  // Convert hash to page identifier
  let page = 'home';
  if (hash === '#/products') page = 'products';
  else if (hash === '#/services') page = 'services';
  else if (hash === '#/gallery') page = 'gallery';
  else if (hash === '#/contact') page = 'contact';

  return { hash, page, navigate };
}
