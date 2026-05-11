import { getOrCreateConversation } from "@/lib/shopchat-store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { productSlug?: string };
  const productSlug = body.productSlug || "nova-smart-watch";
  const data = await getOrCreateConversation(productSlug);

  return Response.json(data);
}
