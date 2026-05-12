"use client";

import { UserButton } from "@clerk/nextjs";
import { LayoutDashboard, ShoppingBag, Store } from "lucide-react";
import { useRouter } from "next/navigation";

async function becomeSeller() {
  await fetch("/api/seller/activate", { method: "POST" });
}

export function ShopChatUserButton() {
  const router = useRouter();

  return (
    <UserButton userProfileMode="modal">
      <UserButton.MenuItems>
        <UserButton.Link
          label="Start Shopping"
          href="/marketplace"
          labelIcon={<ShoppingBag className="h-4 w-4" />}
        />
        <UserButton.Action
          label="Become a Seller"
          labelIcon={<Store className="h-4 w-4" />}
          onClick={async () => {
            await becomeSeller();
            router.push("/seller-dashboard");
            router.refresh();
          }}
        />
        <UserButton.Link
          label="Seller Dashboard"
          href="/seller-dashboard"
          labelIcon={<LayoutDashboard className="h-4 w-4" />}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
