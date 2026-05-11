import { ChatPage } from "@/components/marketing/chat/chat-page";
import { getConversationMessages, getOrCreateConversation } from "@/lib/shopchat-store";

export default async function ChatRoute(props: PageProps<"/chat">) {
  const searchParams = await props.searchParams;
  const productSlug =
    typeof searchParams.product === "string" ? searchParams.product : "nova-smart-watch";
  const { conversation, product } = await getOrCreateConversation(productSlug);
  const messages = await getConversationMessages(conversation.id);

  return (
    <ChatPage
      conversation={conversation}
      initialMessages={messages}
      product={product}
    />
  );
}
