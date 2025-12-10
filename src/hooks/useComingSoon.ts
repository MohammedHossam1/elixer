import { useEffect, useState } from "react";

/**
 * Hook to check if we should show the coming soon page
 * The page will be hidden on Saturday at 10 AM
 */
export const useComingSoon = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const nextSaturday10AM = new Date();
      
      // Find next Saturday at 10 AM
      const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
      let daysUntilSaturday;
      
      if (currentDay < 6) {
        // If today is before Saturday, get days until this Saturday
        daysUntilSaturday = 6 - currentDay;
      } else if (currentDay === 6) {
        // If today is Saturday, check if it's before 10 AM
        if (now.getHours() < 10 || (now.getHours() === 10 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
          // It's Saturday but before 10 AM, use today
          daysUntilSaturday = 0;
        } else {
          // It's Saturday but after 10 AM, use next Saturday
          daysUntilSaturday = 7;
        }
      } else {
        // If today is after Saturday (Sunday), get next week's Saturday
        daysUntilSaturday = 6 - currentDay + 7;
      }
      
      nextSaturday10AM.setDate(now.getDate() + daysUntilSaturday);
      nextSaturday10AM.setHours(10, 0, 0, 0); // 10 AM
      nextSaturday10AM.setMinutes(0, 0, 0);
      nextSaturday10AM.setSeconds(0, 0);

      // If current time is before next Saturday 10 AM, show coming soon
      setShowComingSoon(now < nextSaturday10AM);
    };

    // Check immediately
    checkTime();

    // Check every second to update in real-time when time is up
    // This ensures the page disappears immediately at 10 AM on Saturday
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return showComingSoon;
};

