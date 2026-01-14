"use server";

import cloudinary from "@/data/cloudinary/config";
import crypto from "crypto";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("Nenhum arquivo encontrado");
  };
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileHash = crypto.createHash("sha256").update(buffer).digest("hex");
  const publicId = `veritas-atelie/catalog-products/${fileHash}`;
  
  const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;
  
  try {
    const result = await cloudinary.uploader.upload(fileBase64, {
      public_id: publicId,
      overwrite: false,
      resource_type: "image"
    });
    
    return result.secure_url;
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.error?.message?.includes("File exists") || error.message?.includes("already exists")) {
      const existing = await cloudinary.api.resource(publicId);
      return existing.secure_url;
    };

    console.error("Erro no Cloudinary:", error);
    throw new Error("Falha no upload da imagem");
  };
};