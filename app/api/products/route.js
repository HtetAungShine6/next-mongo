import Product from "@/models/Product";

export async function GET(request) {
  try {
    const products = await Product.find().populate("category"); 
    return Response.json(products); 
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}