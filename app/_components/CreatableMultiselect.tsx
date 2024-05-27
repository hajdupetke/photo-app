'use client';
import React, { useEffect, useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import { getTags } from '../api/action';
import { Tag } from '@prisma/client';

interface SelectProps {
  tags: Tag[];
}

const CreatableMultiselect = ({ tags }: SelectProps) => {
  const tagNames = tags.map((e) => {
    return { value: e.id, label: e.name };
  });
  console.log(tagNames);

  return (
    <CreatableSelect
      isMulti
      options={tagNames}
      name="tags"
      className="h-1/3"
      placeholder="Válaszd ki a képhez megfelelő tag-eket"
    />
  );
};

export default CreatableMultiselect;
