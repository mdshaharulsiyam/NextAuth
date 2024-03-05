import DataGet from "@/DataFetch/DataGet";
import CredentialsProvider from "next-auth/providers/credentials";
export const authoptions = {
    pages: {
        signIn: '/'
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const Data = await DataGet(`api/user?email=${credentials?.email}&password=${credentials?.password}`)
                if (Data?.success) {
                    const user = {
                        FullName: Data?.data?.FullName,
                        photo: Data?.data?.photo,
                        email: Data?.data?.email,
                        role: Data?.data?.role,
                    }
                    // console.log(user)
                    return user
                } else {
                    return null
                }

            }
        })
    ],
    trustHost: true,
    trustHostedDomain: true,
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({token, user,account, profile}){

            if (user) {
              token.FullName = user.FullName,
              token.email = user.email,
              token.photo= user.photo,
              token.role = user.role
              
            }
            return token
      
          },
          async session({ session, token, profile }) {
            if (session.user) {
      
              session.user.photo = token.photo,
              session.user.FullName = token.FullName ,
              session.user.role = token.role,
              session.user.email = token.email
            }
              
            return session
          }
    }
}
