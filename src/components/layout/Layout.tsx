import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";
import { SplashScreen } from "./SplashScreen";
import ScrollToTop from "./ScrollToTop";
import { Footer } from "./Footer";
import { SocialRail } from "./SocialRail";

export default function Layout() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Trigger splash when navigating home via logo/nav
  const triggerSplash = useCallback(() => {
    setShowSplash(true);
  }, []);

  return (
    <div className="min-h-screen bg-background bg-grid flex flex-col">
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[110] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Navigation onLogoClick={triggerSplash} />
      <SocialRail />
      <main id="main-content" className="pt-14 flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
