'use server';
import { unstable_noStore as noStore } from 'next/cache';

import { revalidatePath } from 'next/cache';
import prisma from './db';

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getImages = async () => {
  noStore();
  const data = await prisma.image.findMany();

  return data;
};
