import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";
import { SplashScreen } from "./SplashScreen";
import ScrollToTop from "./ScrollToTop";
import { Footer } from "./Footer";

export default function Layout() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(() => {
    const seen = sessionStorage.getItem("splash_seen");
    return !seen;
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem("splash_seen", "true");
  }, []);

  // Trigger splash when navigating home via logo
  const triggerSplash = useCallback(() => {
    if (location.pathname === "/") {
      setShowSplash(true);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <ScrollToTop />
      <Navigation onLogoClick={triggerSplash} />
      <main className="pt-14 flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
