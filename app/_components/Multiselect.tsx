'use client';

import { Tag } from '@prisma/client';
import { useId } from 'react';
import Select from 'react-select';

interface MultiselectProps {
  tags: Tag[];
  setData: (tags: number[]) => void;
}

const Multiselect = ({ tags, setData }: MultiselectProps) => {
  const tagNames = tags.map((e) => {
    return { value: e.id, label: e.name };
  });

  return (
    <Select
      options={tagNames}
      styles={{
        input: (styles) => ({
          ...styles,
          height: '2.375rem',
        }),
        control: (styles) => ({
          ...styles,
          borderRadius: '0.5rem',
          flexGrow: 'grow',
        }),
        container: (styles) => ({
          ...styles,
          minWidth: '60%',
        }),
      }}
      isMulti
      placeholder="Válaszd ki a tageket"
      onChange={(tags) => {
        const tagsArr = tags.map((tag) => tag.value);
        console.log(tagsArr);
        setData(tagsArr);
      }}
      className="basis-1 md:basis-1/2"
      instanceId={useId()}
      name="tags"
    />
  );
};

export default Multiselect;
