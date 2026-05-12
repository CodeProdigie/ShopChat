import { createProductOffer } from "@/lib/shopchat-store";

export async function POST(request: Request, context: RouteContext<"/api/conversations/[conversationId]/offer">) {
  const { conversationId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as {
    productSlug?: string;
    note?: string;
  };

  if (!body.productSlug) {
    return Response.json({ error: "Product is required." }, { status: 400 });
  }

  const message = await createProductOffer({
    conversationId,
    productSlug: body.productSlug,
    note: body.note || "Would you like to buy this product?",
  });

  return Response.json({ message }, { status: 201 });
}
