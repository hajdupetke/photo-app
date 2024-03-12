'use server';

import prisma from './db';

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getImages = async () => {
  const data = await prisma.image.findMany();
  return data;
};
