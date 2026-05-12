import { activateSeller } from "@/lib/shopchat-store";

export async function POST() {
  try {
    const seller = await activateSeller();
    return Response.json(seller);
  } catch {
    return Response.json({ error: "You must be signed in." }, { status: 401 });
  }
}
