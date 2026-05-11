import { PaymentSuccessPage } from "@/components/marketing/payment-success/payment-success-page";
import { getOrder } from "@/lib/shopchat-store";

export default async function PaymentSuccessRoute() {
  const { order, product } = await getOrder("ORD-7721");

  return <PaymentSuccessPage order={order} product={product} />;
}
