import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
import { Footer } from "./Footer";

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Navigation />
      <main className="pt-14 flex-1">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
