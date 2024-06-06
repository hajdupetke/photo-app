import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../logo.png';

const Logo = () => {
  return (
    <Link
      href="/"
      className=" max-w-fit flex items-center leading-6 text-2xl font-medium"
    >
      <Image
        src={LogoImage}
        alt="Logo"
        width="100"
        height="100"
        className="p-4"
      />
      Encyklopedia
      <br />
      Jaschikina
    </Link>
  );
};

export default Logo;
