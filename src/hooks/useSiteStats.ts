import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteStats {
  totalViews: number;
  totalClicks: number;
  visitorClicks: number;
  sessionClicks: number;
}

const getOrCreateVisitorId = (): string => {
  const storageKey = "visitor_id";
  let visitorId = localStorage.getItem(storageKey);
  
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(storageKey, visitorId);
  }
  
  return visitorId;
};

export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats>({
    totalViews: 0,
    totalClicks: 0,
    visitorClicks: 0,
    sessionClicks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [visitorId] = useState(getOrCreateVisitorId);

  // Fetch initial stats and increment view on mount
  useEffect(() => {
    const initializeStats = async () => {
      try {
        // Atomically increment views and get updated stats
        const { data: viewData, error: viewError } = await supabase
          .rpc("increment_site_views");

        if (viewError) {
          console.error("Error incrementing views:", viewError);
        }

        // Get or create visitor clicks record
        let { data: visitorData } = await supabase
          .from("visitor_clicks")
          .select("click_count")
          .eq("visitor_id", visitorId)
          .maybeSingle();

        if (!visitorData) {
          const { data: newVisitor } = await supabase
            .from("visitor_clicks")
            .insert({ visitor_id: visitorId, click_count: 0 })
            .select("click_count")
            .single();
          visitorData = newVisitor;
        }

        const statsRow = Array.isArray(viewData) ? viewData[0] : viewData;
        
        setStats({
          totalViews: statsRow?.total_views ?? 0,
          totalClicks: statsRow?.total_clicks ?? 0,
          visitorClicks: visitorData?.click_count ?? 0,
          sessionClicks: 0,
        });
      } catch (error) {
        console.error("Error initializing site stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStats();
  }, [visitorId]);

  const incrementClick = useCallback(async () => {
    // Optimistic update for session clicks only
    setStats((prev) => ({
      ...prev,
      sessionClicks: prev.sessionClicks + 1,
    }));

    try {
      // Atomically increment total clicks and visitor clicks in parallel
      const [totalResult, visitorResult] = await Promise.all([
        supabase.rpc("increment_total_clicks"),
        supabase.rpc("increment_visitor_clicks", { p_visitor_id: visitorId }),
      ]);

      if (totalResult.error) {
        console.error("Error incrementing total clicks:", totalResult.error);
      }
      if (visitorResult.error) {
        console.error("Error incrementing visitor clicks:", visitorResult.error);
      }

      // Update state with actual database values
      setStats((prev) => ({
        ...prev,
        totalClicks: totalResult.data ?? prev.totalClicks + 1,
        visitorClicks: visitorResult.data ?? prev.visitorClicks + 1,
      }));
    } catch (error) {
      console.error("Error incrementing click:", error);
      // Rollback session clicks on error
      setStats((prev) => ({
        ...prev,
        sessionClicks: prev.sessionClicks - 1,
      }));
    }
  }, [visitorId]);

  return { stats, isLoading, incrementClick };
}
