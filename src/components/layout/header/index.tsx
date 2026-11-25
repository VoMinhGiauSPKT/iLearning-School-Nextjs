import DesktopHeader from "./desktop";
import MobileHeader from "./mobile";
import { HeaderData } from "@/types/landing";

interface HeaderProps {
    header: HeaderData;
    isMobile?: boolean;
}

export default function Header({ header, isMobile }: HeaderProps) {
    if (isMobile) {
        return <MobileHeader header={header} />;
    }
    return <DesktopHeader header={header} />;
}

export { DesktopHeader, MobileHeader };
