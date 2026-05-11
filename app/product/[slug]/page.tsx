import { ProductDetailPage } from "@/components/marketing/product-detail/product-detail-page";
import { getProduct } from "@/lib/shopchat-store";

export default async function ProductDetailRoute(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  return <ProductDetailPage product={product} />;
}
