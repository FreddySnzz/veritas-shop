"use server";

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