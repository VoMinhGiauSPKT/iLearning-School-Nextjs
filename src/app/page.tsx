import { getLandingPageData } from "@/services/landing.service";
import { getIsMobile } from "@/lib/device";
import DesktopHome from "@/components/views/desktop-home";
import MobileHome from "@/components/views/mobile-home";
export const instant = false
export default async function HomePage() {
  // Lấy dữ liệu và kiểm tra thiết bị song song trên Server
  const [data, isMobile] = await Promise.all([
    getLandingPageData(),
    getIsMobile(),
  ]);

  // Nếu là Mobile: Server render MobileHome (nhẹ, nhanh, không thừa component)
  if (isMobile) {
    return <MobileHome data={data} />;
  }

  // Nếu là Desktop: Server render đầy đủ
  return <DesktopHome data={data} />;
}