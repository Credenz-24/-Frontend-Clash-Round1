import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DisableNavigation({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ''; // For Chrome
    };

    const handlePopstate = () => {
      window.history.forward(); // Prevent navigating back
    };

    const handleHashChange = () => {
      window.location.hash = ''; // Prevent navigating using hash
    };

    const handleLocationChange = () => {
      // You can check for certain conditions here and decide whether to allow the route change
      // For example, if the user is not authenticated, you can prevent navigation to certain routes
      // You can use your own logic here
      // For demo purposes, we're preventing all route changes
      navigate('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [navigate]);

  return <>{children}</>;
}

export default DisableNavigation;
