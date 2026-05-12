import { MarketplacePage } from "@/components/marketing/marketplace/marketplace-page";
import { getProducts } from "@/lib/shopchat-store";

export const dynamic = "force-dynamic";

export default async function MarketplaceRoute() {
  const products = await getProducts();

  return <MarketplacePage products={products} />;
}
