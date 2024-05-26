'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { UTApi } from 'uploadthing/server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import { redirect } from 'next/navigation';
import sharp from 'sharp';

const utapi = new UTApi();

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getImages = async () => {
  noStore();
  const data = await prisma.image.findMany();

  return data;
};

export const createImage = async (formData: FormData) => {
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;

  const fileBuffer = await file.arrayBuffer();
  try {
    const compressedFileBuffer = await sharp(fileBuffer)
      .png({ quality: 80, palette: true })
      .toBuffer();
    const compressedFile = new File(
      [new Blob([compressedFileBuffer])],
      'lajos.png'
    );

    const response = await utapi.uploadFiles(compressedFile);
    if (response.error != null) {
      throw new Error('Upload failed');
    }

    if (response.data != null) {
      console.log('Upload successful');
      const url = response['data']['url'];
      const image = await prisma.image.create({
        data: {
          url: url,
          name: name,
          title: title,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
  redirect('/');
};
