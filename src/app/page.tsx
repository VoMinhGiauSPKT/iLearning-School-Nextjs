import { getLandingPageData } from "@/services/landing.service";
import { getIsMobile } from "@/lib/device";
import DesktopHome from "@/components/views/desktop-home";
import MobileHome from "@/components/views/mobile-home";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [data, isMobile] = await Promise.all([
    getLandingPageData(),
    getIsMobile(),
  ]);

  if (isMobile) {
    return <MobileHome data={data} />;
  }

  return <DesktopHome data={data} />;
}
