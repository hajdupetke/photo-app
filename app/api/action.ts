'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { UTApi } from 'uploadthing/server';
import prisma from './db';
import { redirect } from 'next/navigation';
import { Image } from '@prisma/client';
import { signIn } from './auth';

const ITEMS_PER_PAGE = 36;
const ADMIN_ITEMS_PER_PAGE = 20;
const utapi = new UTApi();

export const getUsers = async () => {
  const data = await prisma.user.findMany();
  return data;
};

export const getUser = async (email: string) => {
  noStore();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
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

export const getImages = async (
  currentPage: number,
  tagIds: number[] | null,
  query: string | null
) => {
  //Jesus christ, fix this
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  if (
    (tagIds === null || tagIds.length <= 0) &&
    (query === null || query.length <= 0)
  ) {
    const data = await prisma.image.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
    });

    return data;
  } else if (query && tagIds) {
    const imageTags = await prisma.imageTag.findMany({
      where: { tagId: { in: tagIds } },
    });

    const imageIds = imageTags.map((imageTag) => {
      return imageTag.imageId;
    });

    if (isNaN(Number(query))) {
      const data = await prisma.image.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
          id: {
            in: imageIds,
          },
        },
      });

      return data;
    } else {
      const data = await prisma.image.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          year: Number(query),
        },
      });
      return data;
    }
  } else if (query) {
    if (isNaN(Number(query))) {
      const data = await prisma.image.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      return data;
    } else {
      const data = await prisma.image.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
          year: Number(query),
        },
      });
      return data;
    }
  } else if (tagIds) {
    const imageTags = await prisma.imageTag.findMany({
      where: { tagId: { in: tagIds } },
    });

    const imageIds = imageTags.map((imageTag) => {
      return imageTag.imageId;
    });

    const data = await prisma.image.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    return data;
  }
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

  const newTagNames = tags.filter((tag) => {
    return isNaN(Number(tag));
  }) as string[];

  const newTags = newTagNames.map((tag) => {
    return { name: tag.toString() };
  });

  const tagIds = tags
    .filter((e) => {
      return newTagNames.indexOf(e as string) == -1;
    })
    .map((tag) => {
      return { id: Number(tag) };
    });

  try {
    const response = await utapi.uploadFiles(file);
    if (response.error != null) {
      throw new Error('Upload failed');
    }

    if (response.data != null) {
      console.log('Upload successful');
      const url = response['data']['url'];

      const createdTags = await prisma.tag.createMany({
        data: newTags,
        skipDuplicates: true, // In case some tags already exist
      });

      const newTagIds = await prisma.tag.findMany({
        where: {
          name: {
            in: newTagNames,
          },
        },
        select: {
          id: true,
        },
      });

      const allTagIds = tagIds.concat(newTagIds.map((tag) => ({ id: tag.id })));

      const image = await prisma.image.create({
        data: {
          url: url,
          name: name,
          title: title,
          year: year,
          tags: {
            createMany: {
              data: allTagIds.map((tagId) => ({ tagId: tagId.id })),
            },
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

export const fetchNumOfPages = async (
  query: string | null,
  tagIds: number[] | null
) => {
  noStore();
  if (
    (tagIds === null || tagIds.length <= 0) &&
    (query === null || query.length <= 0)
  ) {
    const data = await prisma.image.count();

    return Math.ceil(data / ITEMS_PER_PAGE);
  } else if (query && tagIds) {
    const imageTags = await prisma.imageTag.findMany({
      where: { tagId: { in: tagIds } },
    });

    const imageIds = imageTags.map((imageTag) => {
      return imageTag.imageId;
    });

    if (isNaN(Number(query))) {
      const data = await prisma.image.count({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
          id: {
            in: imageIds,
          },
        },
      });

      return Math.ceil(data / ITEMS_PER_PAGE);
    } else {
      const data = await prisma.image.count({
        where: {
          year: Number(query),
        },
      });
      return Math.ceil(data / ITEMS_PER_PAGE);
    }
  } else if (query) {
    if (isNaN(Number(query))) {
      const data = await prisma.image.count({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      });

      return Math.ceil(data / ITEMS_PER_PAGE);
    } else {
      const data = await prisma.image.count({
        where: {
          year: Number(query),
        },
      });
      return Math.ceil(data / ITEMS_PER_PAGE);
    }
  } else if (tagIds) {
    const imageTags = await prisma.imageTag.findMany({
      where: { tagId: { in: tagIds } },
    });

    const imageIds = imageTags.map((imageTag) => {
      return imageTag.imageId;
    });

    const data = await prisma.image.count({
      where: {
        id: {
          in: imageIds,
        },
      },
    });

    return Math.ceil(data / ITEMS_PER_PAGE);
  }
  const data = await prisma.image.count();
  return Math.ceil(data / ITEMS_PER_PAGE);
};

export const authenticate = async (formData: FormData) => {
  try {
    await signIn('credentials', formData);
  } catch (err) {
    console.error(err);
  }

  redirect('/admin');
};

export const adminFetchNumOfPages = async () => {
  noStore();
  const data = Math.ceil((await prisma.image.count()) / ADMIN_ITEMS_PER_PAGE);

  return data;
};

export const adminGetImages = async (currentPage: number) => {
  noStore();
  const offset = (currentPage - 1) * ADMIN_ITEMS_PER_PAGE;

  const data = await prisma.image.findMany({
    skip: offset,
    take: ADMIN_ITEMS_PER_PAGE,
  });

  return data;
};

export const deleteImage = async (searchParams: {
  page: number;
  open: boolean;
  id: number;
}) => {
  const idString = searchParams.id.toString();
  const id = parseInt(idString);

  const deleteTag = await prisma.imageTag.deleteMany({
    where: {
      imageId: id,
    },
  });

  const deleted = await prisma.image.delete({
    where: { id: id },
  });

  const imageHash = deleted.url.split('/').pop() as string;

  utapi.deleteFiles(imageHash);

  redirect('/admin');
};

export const updateImage = async (id: string, formData: FormData) => {
  const file = formData.get('image') as File;
  const title = formData.get('title') as string;
  const name = formData.get('name') as string;
  const year = parseInt(formData.get('year') as string);
  const tags = formData.getAll('tags');

  const image = await prisma.image.findFirst({ where: { id: parseInt(id) } });

  console.log(image);

  const newTagNames = tags.filter((tag) => {
    return isNaN(Number(tag));
  }) as string[];

  const newTags = newTagNames.map((tag) => {
    return { name: tag.toString() };
  });

  const tagIds = tags
    .filter((e) => {
      return newTagNames.indexOf(e as string) == -1;
    })
    .map((tag) => {
      return { id: Number(tag) };
    });

  const createdTags = await prisma.tag.createMany({
    data: newTags,
    skipDuplicates: true, // In case some tags already exist
  });

  const newTagIds = await prisma.tag.findMany({
    where: {
      name: {
        in: newTagNames,
      },
    },
    select: {
      id: true,
    },
  });

  const allTagIds = tagIds.concat(newTagIds.map((tag) => ({ id: tag.id })));

  if (file && file.size > 0) {
    //Delete old file, upload new, update image
    const imageHash = image?.url.split('/').pop() as string;

    utapi.deleteFiles(imageHash);

    try {
      const response = await utapi.uploadFiles(file);
      if (response.error != null) {
        throw new Error('Upload failed');
      }

      if (response.data != null) {
        console.log('Upload successful');
        const url = response['data']['url'];

        const updateImage = await prisma.image.update({
          where: {
            id: parseInt(id),
          },
          data: {
            url: url,
            name: name,
            title: title,
            year: year,
            tags: {
              deleteMany: {},
              createMany: {
                data: allTagIds.map((tagId) => ({ tagId: tagId.id })),
              },
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
  } else {
    //Update image with new parameters
    const updateImage = await prisma.image.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name,
        title: title,
        year: year,
        tags: {
          deleteMany: {},
          createMany: {
            data: allTagIds.map((tagId) => ({ tagId: tagId.id })),
          },
        },
      },
      include: {
        tags: true,
      },
    });
  }
  redirect(`/picture/${id}`);
};
