import { NextResponse } from "next/server";
import rawProducts from "@/data/products.json";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const highlight = searchParams.get("highlight");

  let products = rawProducts;

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (highlight === "true") {
    products = products.slice(0, 3);
  }

  return NextResponse.json(products);
};

