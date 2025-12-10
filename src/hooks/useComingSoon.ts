import { useEffect, useState } from "react";

/**
 * Hook to check if we should show the coming soon page
 * The page will be hidden on Thursday at 10 PM
 */
export const useComingSoon = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const nextThursday10PM = new Date();
      
      // Find next Thursday at 10 PM
      const currentDay = now.getDay(); // 0 = Sunday, 4 = Thursday
      let daysUntilThursday;
      
      if (currentDay < 4) {
        // If today is before Thursday, get days until this Thursday
        daysUntilThursday = 4 - currentDay;
      } else if (currentDay === 4) {
        // If today is Thursday, check if it's before 10 PM
        if (now.getHours() < 22 || (now.getHours() === 22 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
          // It's Thursday but before 10 PM, use today
          daysUntilThursday = 0;
        } else {
          // It's Thursday but after 10 PM, use next Thursday
          daysUntilThursday = 7;
        }
      } else {
        // If today is after Thursday, get next week's Thursday
        daysUntilThursday = 4 - currentDay + 7;
      }
      
      nextThursday10PM.setDate(now.getDate() + daysUntilThursday);
      nextThursday10PM.setHours(22, 0, 0, 0); // 10 PM
      nextThursday10PM.setMinutes(0, 0, 0);
      nextThursday10PM.setSeconds(0, 0);

      // If current time is before next Thursday 10 PM, show coming soon
      setShowComingSoon(now < nextThursday10PM);
    };

    // Check immediately
    checkTime();

    // Check every second to update in real-time when time is up
    // This ensures the page disappears immediately at 10 PM on Thursday
    const interval = setInterval(checkTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return showComingSoon;
};

