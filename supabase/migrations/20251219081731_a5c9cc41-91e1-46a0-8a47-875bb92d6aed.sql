-- Create site_stats table for global counters (single row)
CREATE TABLE public.site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_views BIGINT NOT NULL DEFAULT 0,
  total_clicks BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial row
INSERT INTO public.site_stats (id, total_views, total_clicks) VALUES (1, 0, 0);

-- Create visitor_clicks table for tracking individual visitors
CREATE TABLE public.visitor_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL UNIQUE,
  click_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_clicks ENABLE ROW LEVEL SECURITY;

-- Create policies for public read/write access (no auth required for this use case)
CREATE POLICY "Allow public read on site_stats" 
ON public.site_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public update on site_stats" 
ON public.site_stats 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read on visitor_clicks" 
ON public.visitor_clicks 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert on visitor_clicks" 
ON public.visitor_clicks 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update on visitor_clicks" 
ON public.visitor_clicks 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_visitor_clicks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visitor_clicks_updated_at
BEFORE UPDATE ON public.visitor_clicks
FOR EACH ROW
EXECUTE FUNCTION public.update_visitor_clicks_updated_at();