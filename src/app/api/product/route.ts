import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

interface Product {
  id: string;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = (formData.get("image") as File) || null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;

  const maxQuantity = formData.get("maxQuantity") as string;

  if (!file) {
    return NextResponse.json({ message: "File is not there" }, { status: 405 });
  }

  try {
    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "image-optimize" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        image: result.public_id,
        category,
        maxQuantity: Number(maxQuantity),
      },
    });
    return NextResponse.json(
      {
        product,
        message: "Image uploaded successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idParam = searchParams.get("ids");

  try {
    let products: Product[];

    if (idParam && idParam.trim() !== "") {
      const idArray = idParam.split(",").filter((id) => id.trim() !== "");

      if (idArray.length === 0) {
        return NextResponse.json(
          { error: "No valid IDs provided" },
          { status: 400 }
        );
      }

      products = await prisma.product.findMany({
        where: {
          id: {
            in: idArray,
          },
        },
      });
    } else {
      products = await prisma.product.findMany();
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch products",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
