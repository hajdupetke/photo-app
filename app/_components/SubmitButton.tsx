'use client';

import { useFormStatus } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return <LoadingSpinner />;
  }

  return (
    <button className="btn max-w-min" type="submit">
      Mentés
    </button>
  );
};

export default SubmitButton;
