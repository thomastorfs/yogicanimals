import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      // 1. Scroll to top
      window.scrollTo(0, 0);

      // 2. Update Metadata URLs (Canonical & OpenGraph)
      // Construct the full URL including hash for sharing/reference
      const fullUrl = `${window.location.origin}${window.location.pathname}#${pathname}`;
      
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', fullUrl);
      
      let ogUrl = document.querySelector("meta[property='og:url']") as HTMLMetaElement;
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', fullUrl);

    } catch (e) {
      // Silently fail if something goes wrong
      console.debug('Metadata update skipped', e);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;