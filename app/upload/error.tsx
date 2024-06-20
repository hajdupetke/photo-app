'use client';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Valami hiba történt!</h2>
      <Link href="/" className="btn btn-primary">
        Vissza a főoldalra
      </Link>
    </div>
  );
}
