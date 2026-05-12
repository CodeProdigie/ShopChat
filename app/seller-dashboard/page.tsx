import { SellerDashboardPage } from "@/components/marketing/seller-dashboard/seller-dashboard-page";
import { getSellerConversations, getSellerProducts } from "@/lib/shopchat-store";

export const dynamic = "force-dynamic";

export default async function SellerDashboardRoute() {
  const [products, conversations] = await Promise.all([
    getSellerProducts(),
    getSellerConversations(),
  ]);

  return <SellerDashboardPage initialProducts={products} initialConversations={conversations} />;
}
