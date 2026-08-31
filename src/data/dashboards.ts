import somaliaForecast from "@/assets/dashboards/somalia-displacement-forecast.webp";
import somaliaIdps from "@/assets/dashboards/somalia-idps-movement.webp";
import primeVideo from "@/assets/dashboards/prime-video.webp";
import portraitSuit from "@/assets/gallery/portrait-suit.webp";
import streetThobe from "@/assets/gallery/street-thobe.webp";
import graduation from "@/assets/gallery/graduation.webp";
import eveningChair from "@/assets/gallery/evening-chair.webp";
import ceilingSelfie from "@/assets/gallery/ceiling-selfie.webp";

export interface DashboardItem {
  id: string;
  title: string;
  image: string;
}

export const dashboards: DashboardItem[] = [
  {
    id: "somalia-displacement-forecast",
    title: "Somalia Displacement Forecast",
    image: somaliaForecast,
  },
  {
    id: "somalia-idps-movement",
    title: "Somalia IDPs Movement",
    image: somaliaIdps,
  },
  {
    id: "prime-video",
    title: "Prime Video Content",
    image: primeVideo,
  },
];

export const photos: DashboardItem[] = [
  { id: "portrait", title: "Portrait", image: portraitSuit },
  { id: "street", title: "Mogadishu streets", image: streetThobe },
  { id: "graduation", title: "Graduation day", image: graduation },
  { id: "evening", title: "Evening", image: eveningChair },
  { id: "selfie", title: "Looking up", image: ceilingSelfie },
];
