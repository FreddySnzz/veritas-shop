"use server";

import crypto from "crypto";
import cloudinary from "@/data/cloudinary/config";

function getPublicIdFromUrl(url: string) {
  const regex = /\/v\d+\/(.+)\.\w+$/;
  const match = url.match(regex);

  return match ? match[1] : null;
};

export async function deleteImageAction(imageUrl: string) {
  if (!imageUrl) return;

  const publicId = getPublicIdFromUrl(imageUrl);

  if (!publicId) {
    console.error("Não foi possível extrair o ID da imagem:", imageUrl);
    return;
  };

  try {
    await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
  } catch (error) {
    console.error("Erro ao apagar imagem do Cloudinary:", error);
  };
};

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