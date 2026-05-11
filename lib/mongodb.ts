import "server-only";

import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGO_DB_URL?.trim() || process.env.MONGODB_URI?.trim();

let clientPromise: Promise<MongoClient> | null = null;

export function hasMongoConfig() {
  return Boolean(uri);
}

async function getClient() {
  if (!uri) {
    throw new Error("Missing MONGO_DB_URL or MONGODB_URI");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function getShopChatDb(): Promise<Db> {
  const client = await getClient();
  return client.db(process.env.MONGO_DB_NAME || "shopchat");
}
