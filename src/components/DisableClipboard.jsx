import React, { useEffect } from 'react';

function DisableClipboard({ children }) {
  useEffect(() => {
    const preventClipboard = (event) => {
      event.preventDefault();
    };

    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    const handleBackButton = (event) => {
      // Redirect to /question if the user is on /question and tries to navigate back
      if (window.location.pathname === '/question') {
        event.preventDefault();
        window.location.href = '/question';
      } else {
        // Otherwise, prevent going back
        window.history.forward();
      }
    };

    document.addEventListener('copy', preventClipboard);
    document.addEventListener('cut', preventClipboard);
    document.addEventListener('paste', preventClipboard);
    document.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      document.removeEventListener('copy', preventClipboard);
      document.removeEventListener('cut', preventClipboard);
      document.removeEventListener('paste', preventClipboard);
      document.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  return <>{children}</>;
}

export default DisableClipboard;