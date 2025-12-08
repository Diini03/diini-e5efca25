import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navigation />
      <main className="pt-14">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
