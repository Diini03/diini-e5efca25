import somaliaForecast from "@/assets/dashboards/somalia-displacement-forecast.webp";
import somaliaIdps from "@/assets/dashboards/somalia-idps-movement.webp";
import primeVideo from "@/assets/dashboards/prime-video.webp";

export interface DashboardItem {
  id: string;
  title: string;
  image: string;
}

export const dashboards: DashboardItem[] = [
  {
    id: "somalia-displacement-forecast",
    title: "Somalia Displacement Forecast",
    image: somaliaForecast.url,
  },
  {
    id: "somalia-idps-movement",
    title: "Somalia IDPs Movement",
    image: somaliaIdps.url,
  },
  {
    id: "prime-video",
    title: "Prime Video Content",
    image: primeVideo.url,
  },
];
