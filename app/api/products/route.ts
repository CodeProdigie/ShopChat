import { createProduct, getProducts } from "@/lib/shopchat-store";

export async function GET() {
  return Response.json({ products: await getProducts() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    image?: string;
    stock?: number;
  };

  if (!body.title || !body.description || !body.price) {
    return Response.json({ error: "Title, description, and price are required." }, { status: 400 });
  }

  const product = await createProduct({
    title: body.title,
    price: Number(body.price),
    description: body.description,
    category: body.category,
    image: body.image,
    stock: Number(body.stock || 1),
  });

  return Response.json({ product }, { status: 201 });
}
