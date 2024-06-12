import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { compare, hash } from 'bcryptjs';
import { getUser } from './action';
import { redirect } from 'next/navigation';

interface CredentialsIF {
  email: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (
        credentials: Partial<Record<'email' | 'password', unknown>>
      ) => {
        let user = null;

        // logic to salt and hash password

        // logic to verify if user exists
        user = await getUser(credentials.email as string);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        if (
          !(await compare(
            credentials.password as string,
            user.password as string
          ))
        ) {
          throw new Error('Password not matching');
        }
        // Ensure the id is a string
        return {
          ...user,
          id: user.id.toString(),
        };
      },
    }),
  ],
});
