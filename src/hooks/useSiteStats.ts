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
        // Increment total views
        const { data: currentStats } = await supabase
          .from("site_stats")
          .select("total_views, total_clicks")
          .eq("id", 1)
          .maybeSingle();

        if (currentStats) {
          await supabase
            .from("site_stats")
            .update({ total_views: currentStats.total_views + 1 })
            .eq("id", 1);
        }

        // Fetch updated stats
        const { data: updatedStats } = await supabase
          .from("site_stats")
          .select("total_views, total_clicks")
          .eq("id", 1)
          .maybeSingle();

        // Fetch or create visitor clicks
        let { data: visitorData } = await supabase
          .from("visitor_clicks")
          .select("click_count")
          .eq("visitor_id", visitorId)
          .maybeSingle();

        if (!visitorData) {
          await supabase
            .from("visitor_clicks")
            .insert({ visitor_id: visitorId, click_count: 0 });
          visitorData = { click_count: 0 };
        }

        setStats({
          totalViews: updatedStats?.total_views ?? 0,
          totalClicks: updatedStats?.total_clicks ?? 0,
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
    try {
      // Optimistic update
      setStats((prev) => ({
        ...prev,
        totalClicks: prev.totalClicks + 1,
        visitorClicks: prev.visitorClicks + 1,
        sessionClicks: prev.sessionClicks + 1,
      }));

      // Update total clicks in site_stats
      const { data: currentStats } = await supabase
        .from("site_stats")
        .select("total_clicks")
        .eq("id", 1)
        .maybeSingle();

      if (currentStats) {
        await supabase
          .from("site_stats")
          .update({ total_clicks: currentStats.total_clicks + 1 })
          .eq("id", 1);
      }

      // Update visitor clicks
      const { data: visitorData } = await supabase
        .from("visitor_clicks")
        .select("click_count")
        .eq("visitor_id", visitorId)
        .maybeSingle();

      if (visitorData) {
        await supabase
          .from("visitor_clicks")
          .update({ click_count: visitorData.click_count + 1 })
          .eq("visitor_id", visitorId);
      }
    } catch (error) {
      console.error("Error incrementing click:", error);
      // Rollback on error
      setStats((prev) => ({
        ...prev,
        totalClicks: prev.totalClicks - 1,
        visitorClicks: prev.visitorClicks - 1,
        sessionClicks: prev.sessionClicks - 1,
      }));
    }
  }, [visitorId]);

  return { stats, isLoading, incrementClick };
}
