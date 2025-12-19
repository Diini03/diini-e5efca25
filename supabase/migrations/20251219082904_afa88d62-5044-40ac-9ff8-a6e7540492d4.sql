-- Create atomic increment function for site stats
CREATE OR REPLACE FUNCTION public.increment_site_views()
RETURNS TABLE(total_views BIGINT, total_clicks BIGINT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.site_stats 
  SET total_views = site_stats.total_views + 1 
  WHERE id = 1;
  
  RETURN QUERY SELECT site_stats.total_views, site_stats.total_clicks 
  FROM public.site_stats WHERE id = 1;
END;
$$;

-- Create atomic increment function for total clicks
CREATE OR REPLACE FUNCTION public.increment_total_clicks()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_total BIGINT;
BEGIN
  UPDATE public.site_stats 
  SET total_clicks = site_stats.total_clicks + 1 
  WHERE id = 1
  RETURNING site_stats.total_clicks INTO new_total;
  
  RETURN new_total;
END;
$$;

-- Create atomic increment function for visitor clicks
CREATE OR REPLACE FUNCTION public.increment_visitor_clicks(p_visitor_id TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  INSERT INTO public.visitor_clicks (visitor_id, click_count)
  VALUES (p_visitor_id, 1)
  ON CONFLICT (visitor_id) 
  DO UPDATE SET click_count = visitor_clicks.click_count + 1, updated_at = now()
  RETURNING click_count INTO new_count;
  
  RETURN new_count;
END;
$$;