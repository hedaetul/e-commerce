import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/api/product/products.json");

const readProducts = () => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.log("Error reading products file:", error);
  }
};

const writeProducts = (products: any[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  } catch (error) {
    console.log("Error writing products file: ", error);
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
    const currentProducts = readProducts();
    currentProducts.push(newProduct);
    writeProducts(currentProducts);

    return NextResponse.json(
      { message: "Product added successfully!" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 },
    );
  }
};
