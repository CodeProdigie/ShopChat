import { deleteProduct } from "@/lib/shopchat-store";

export async function DELETE(_request: Request, context: RouteContext<"/api/products/[slug]">) {
  const { slug } = await context.params;
  await deleteProduct(slug);

  return Response.json({ ok: true });
}
