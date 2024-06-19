import Logo from './Logo';
import InfoButton from './InfoButton';
import { auth } from '../api/auth';
import Link from 'next/link';
import { logOut } from '../api/action';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex items-center justify-between w-full">
      <Logo />
      <div className="flex items-center">
        {session ? (
          <div className="flex gap-2">
            <Link href="/admin">Admin</Link>
            <form action={logOut}>
              <button type="submit">Kijelentkezés</button>
            </form>
          </div>
        ) : (
          <Link href="/login">Bejelentkezés</Link>
        )}
        <InfoButton />
      </div>
    </header>
  );
};

export default Navbar;
