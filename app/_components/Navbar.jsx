import Logo from './Logo';
import InfoButton from './InfoButton';
import { auth } from '../api/auth';
import Link from 'next/link';
import { signOut } from '../api/auth';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between w-full">
      <Logo />
      <div className="flex items-center">
        {session ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button type="submit">Kijelentkezés</button>
          </form>
        ) : (
          <Link href="/login">Bejelentkezés</Link>
        )}
        <InfoButton />
      </div>
    </header>
  );
};

export default Navbar;
