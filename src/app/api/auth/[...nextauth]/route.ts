import NextAuth, { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
// Prisma
import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
// Providers
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInEmailPassword } from '@/auth/actions/auth-actions'

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma) as Adapter,

	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
		//? Reference: https://next-auth.js.org/providers/credentials
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'user@google.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: '********',
				},
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const user = await signInEmailPassword(
					credentials!.email,
					credentials!.password,
				)

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user
				}
				return null
			},
		}),
	],

	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// console.log({ user, account, profile, email, credentials })
			return true
		},
		async jwt({ token, user, account, profile }) {
			// console.log({ token })
			const dbUser = await prisma.user.findUnique({
				where: { email: token.email ?? 'no-email' },
			})

			token.roles = dbUser?.roles ?? ['no-roles']
			token.id = dbUser?.id ?? 'no-uuid'

			return token
		},
		async session({ session, token, user }) {
			if (session && session.user) {
				//? Se evito warning de typescript agregando el archivo nextauth.d.ts
				session.user.roles = token.roles
				session.user.id = token.id
			}
			return session
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
