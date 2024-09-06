import { auth, db } from "@/app/firebase"; // Ensure db is imported
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then(async (userCredential) => {
            const user = userCredential.user;

            if (user) {
              // Check if the user already exists in Firestore
              const userRef = doc(db, "users", user.uid);
              const userDoc = await getDoc(userRef);

              if (!userDoc.exists()) {
                // User does not exist, so create a new document
                await setDoc(userRef, {
                  uid: user.uid,
                  email: user.email,
                  name: user.displayName || "Unknown", // Use "Unknown" as default
                  createdAt: new Date(),
                });
              }

              // Return the user object (for session)
              return {
                uid: user.uid,
                email: user.email,
                name: user.displayName || "Unknown", // Use "Unknown" as default
              };
            }
            return null;
          })
          .catch((err) => {
            console.error(err);
            return null;
          });
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user info to the session object
      if (token) {
        session.user = {
          ...session.user,
          name: token.name || "Unknown", // Ensure the name is present in the session
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
