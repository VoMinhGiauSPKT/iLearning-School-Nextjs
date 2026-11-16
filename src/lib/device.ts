import { headers } from "next/headers";

/**
 * Nhận diện thiết bị Mobile dựa trên User-Agent và Client Hints ở Server
 */
export async function getIsMobile(): Promise<boolean> {
    const headersList = await headers();

    // 1. Kiểm tra Client Hints (chuẩn mới trên Chrome, Edge, Safari di động)
    const secChUaMobile = headersList.get("sec-ch-ua-mobile");
    if (secChUaMobile === "?1") return true;
    if (secChUaMobile === "?0") return false;

    // 2. Kiểm tra User-Agent truyền thống
    const userAgent = headersList.get("user-agent") || "";
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
    );
}