import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const product = await Product.findById(id).populate("category");
  console.log({ product });
  return Response.json(product);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  return Response.json(await Product.findByIdAndDelete(id));
}

export async function PUT(request) {
  try {
    // Parse the incoming JSON payload
    const { _id, updateData } = await request.json();

    // Ensure _id and updateData are provided
    if (!_id || !updateData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Find the product by _id and update it with the new data
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated product
      runValidators: true // Ensure validation is run on the update
    });

    // If the product is not found
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the updated product as JSON
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    // Parse the incoming JSON payload
    const { _id, updateData } = await request.json();

    // Ensure _id and updateData are provided
    if (!_id || !updateData) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Find the product by _id and apply the partial update using updateData
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true, // Return the updated product
      runValidators: true // Ensure validation is run on the update
    });

    // If the product is not found
    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the updated product as JSON
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

