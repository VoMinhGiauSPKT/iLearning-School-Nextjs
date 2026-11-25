import { headers } from "next/headers";

export async function getIsMobile(): Promise<boolean> {
    const headersList = await headers();

    const secChUaMobile = headersList.get("sec-ch-ua-mobile");
    if (secChUaMobile === "?1") return true;
    if (secChUaMobile === "?0") return false;

    const userAgent = headersList.get("user-agent") || "";
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
    );
}
