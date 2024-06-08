'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { UTApi } from 'uploadthing/server';
import prisma from './db';
import { redirect } from 'next/navigation';
import { Image } from '@prisma/client';

const ITEMS_PER_PAGE = 8;
const utapi = new UTApi();

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getTags = async () => {
  noStore();
  const data = await prisma.tag.findMany();

  return data;
};

export const getImageTags = async (img: Image) => {
  noStore();

  const data = await prisma.tag.findMany({
    where: {
      images: {
        some: { image: img },
      },
    },
    take: 2,
  });

  return data;
};

export const getAllImageTags = async (img: Image) => {
  noStore();

  const data = await prisma.tag.findMany({
    where: {
      images: {
        some: { image: img },
      },
    },
  });

  return data;
};

export const createImageTags = async (ids: number[], names: string[]) => {
  noStore();
  const data = await prisma.tag.findMany({
    where: {
      OR: [{ id: { in: ids } }, { name: { in: names } }],
    },
  });

  return data;
};

export const getImages = async (currentPage: number) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const data = await prisma.image.findMany({
    skip: offset,
    take: ITEMS_PER_PAGE,
  });

  return data;
};

export const createImage = async (formData: FormData) => {
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;
  const year = parseInt(formData.get('year') as string);
  const tags = formData.getAll('tags');
  console.log(tags);

  const newTagNames = new Set(
    tags.filter((e) => {
      return isNaN(Number(e));
    })
  );

  const tagIds = tags
    .filter((e) => {
      return !newTagNames.has(e);
    })
    .map((tag) => Number(tag));

  console.log(tagIds);

  //Create new tags
  newTagNames.forEach(async (tag) => {
    const newTag = await prisma.tag.create({
      data: {
        name: tag.toString(),
      },
    });
  });

  const newTagsArr = Array.from(newTagNames).map((tag) => tag.toString());

  const finalTags = await createImageTags(tagIds, newTagsArr);

  const fileBuffer = await file.arrayBuffer();
  try {
    /*
    const compressedFileBuffer = await sharp(fileBuffer)
      .png({ quality: 80, palette: true })
      .toBuffer();
    const compressedFile = new File(
      [new Blob([compressedFileBuffer])],
      Date.now() + file.name
    );
    */

    const response = await utapi.uploadFiles(file);
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
          year: year,
          tags: {
            create: finalTags.map((tag) => {
              return {
                tag: {
                  connect: { id: tag.id },
                },
              };
            }),
          },
        },
        include: {
          tags: true,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }

  redirect('/');
};

export const getImageById = async (id: number) => {
  noStore();
  const data = await prisma.image.findFirst({ where: { id: id } });
  return data;
};

export const fetchNumOfPages = async () => {
  noStore();
  const data = Math.ceil((await prisma.image.count()) / ITEMS_PER_PAGE);

  return data;
};
