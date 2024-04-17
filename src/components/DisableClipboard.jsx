import React, { useEffect } from 'react';

function DisableClipboard({ children }) {
  useEffect(() => {
    const preventClipboard = (event) => {
      event.preventDefault();
    };

    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener('copy', preventClipboard);
    document.addEventListener('cut', preventClipboard);
    document.addEventListener('paste', preventClipboard);
    document.addEventListener('contextmenu', preventContextMenu);

    return () => {
      document.removeEventListener('copy', preventClipboard);
      document.removeEventListener('cut', preventClipboard);
      document.removeEventListener('paste', preventClipboard);
      document.removeEventListener('contextmenu', preventContextMenu);
    };
  }, []);

  return <>{children}</>;
}

export default DisableClipboard;
