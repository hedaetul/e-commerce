import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/product/products.json");

const readProducts = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.log("Error reading proeducts file: ", error);
    throw new Error("Error reading products");
  }
};

const writeProducts = (products: any[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.log("Error writing products file: ", error);
    throw new Error("Error writing products");
  }
};

export const GET = async () => {
  try {
    const products = readProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve product" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const newProduct = await req.json();

    if (!newProduct.id) {
      return NextResponse.json(
        { message: "Invalid product data" },
        { status: 400 },
      );
    }

    const currentProducts = readProducts();
    currentProducts.push(newProduct);
    writeProducts(currentProducts);

    return NextResponse.json(
      { message: "Product added successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error adding product:", error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 },
    );
  }
};
