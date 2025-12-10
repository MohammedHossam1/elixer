import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const ComingSoon = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "he";
  const isArabic = i18n.language === "ar";
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set HTML lang and dir attributes
  useEffect(() => {
    const isAr = i18n.language === "ar" || i18n.language.startsWith("ar");
    document.documentElement.lang = isAr ? "ar" : i18n.language.startsWith("he") ? "he" : "en";
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.classList.toggle("lang-ar", isAr);
  }, [i18n.language, isRTL]);

  useEffect(() => {
    const calculateTimeLeft = () => {
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

      const difference = nextSaturday10AM.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Reload page when time is up
        window.location.href = "/";
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/50 relative overflow-hidden">
      <Helmet>
        <title>{t("comingSoon.title")}</title>
        <meta name="description" content={t("comingSoon.description")} />
      </Helmet>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.05) 35px, rgba(0,0,0,0.05) 70px)`
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary mb-4 !font-script">
            ELIXIR
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Heading */}
        <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 ${isArabic ? "font-almarai" : ""}`}>
          {t("comingSoon.heading")}
        </h2>

        {/* Subtitle */}
        <p className={`text-xl sm:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto ${isArabic ? "font-almarai" : ""}`}>
          {t("comingSoon.subtitle")}
        </p>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <Clock className="text-rose-gold w-6 h-6 sm:w-8 sm:h-8" />
            <p className={`text-lg sm:text-xl font-semibold text-foreground ${isArabic ? "font-almarai" : ""}`}>
              {t("comingSoon.launchingAt")}
            </p>
          </div>

          <div
            className={`flex gap-4 sm:gap-6 lg:gap-8 justify-center ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {/* Days */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-elegant border border-border min-w-[80px] sm:min-w-[100px]">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-gold mb-2 ${isArabic ? "font-almarai" : ""}`}>
                {formatTime(timeLeft.days)}
              </div>
              <div className={`text-sm sm:text-base text-muted-foreground uppercase tracking-wide ${isArabic ? "font-almarai" : ""}`}>
                {t("comingSoon.days")}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-elegant border border-border min-w-[80px] sm:min-w-[100px]">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-gold mb-2 ${isArabic ? "font-almarai" : ""}`}>
                {formatTime(timeLeft.hours)}
              </div>
              <div className={`text-sm sm:text-base text-muted-foreground uppercase tracking-wide ${isArabic ? "font-almarai" : ""}`}>
                {t("comingSoon.hours")}
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-elegant border border-border min-w-[80px] sm:min-w-[100px]">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-gold mb-2 ${isArabic ? "font-almarai" : ""}`}>
                {formatTime(timeLeft.minutes)}
              </div>
              <div className={`text-sm sm:text-base text-muted-foreground uppercase tracking-wide ${isArabic ? "font-almarai" : ""}`}>
                {t("comingSoon.minutes")}
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-elegant border border-border min-w-[80px] sm:min-w-[100px]">
              <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-gold mb-2 ${isArabic ? "font-almarai" : ""}`}>
                {formatTime(timeLeft.seconds)}
              </div>
              <div className={`text-sm sm:text-base text-muted-foreground uppercase tracking-wide ${isArabic ? "font-almarai" : ""}`}>
                {t("comingSoon.seconds")}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <p className={`mt-12  text-sm ${isArabic ? "font-almarai" : ""}`}>
          {t("comingSoon.footer")}
        </p>
      </div>

    
    </div>
  );
};

export default ComingSoon;

