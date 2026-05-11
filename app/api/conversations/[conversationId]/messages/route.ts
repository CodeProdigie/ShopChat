import { createMessage, getConversationMessages } from "@/lib/shopchat-store";

export async function GET(_request: Request, context: RouteContext<"/api/conversations/[conversationId]/messages">) {
  const { conversationId } = await context.params;
  const messages = await getConversationMessages(conversationId);

  return Response.json({ messages });
}

export async function POST(request: Request, context: RouteContext<"/api/conversations/[conversationId]/messages">) {
  const { conversationId } = await context.params;
  const body = (await request.json().catch(() => ({}))) as {
    text?: string;
    senderRole?: "buyer" | "seller";
  };
  const text = body.text?.trim();

  if (!text) {
    return Response.json({ error: "Message text is required." }, { status: 400 });
  }

  const message = await createMessage({
    conversationId,
    text,
    senderRole: body.senderRole,
  });

  return Response.json({ message }, { status: 201 });
}
