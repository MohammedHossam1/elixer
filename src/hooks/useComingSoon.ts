import { useEffect, useState } from "react";

/**
 * Hook to check if we should show the coming soon page
 * The page will be hidden today at 10:30 AM
 */
export const useComingSoon = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const today1030AM = new Date();
      
      // Set to today at 10:30 AM
      today1030AM.setHours(11, 0, 0, 0);

      // If current time is before today 10:30 AM, show coming soon
      setShowComingSoon(now < today1030AM);
    };

    // Check immediately
    checkTime();

    // Check every second to update in real-time when time is up
    // This ensures the page disappears immediately at 10:30 AM today
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return showComingSoon;
};
