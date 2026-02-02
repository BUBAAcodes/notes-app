import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; 
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import {Resend} from "resend"
import { User } from "lucide-react";
import VerificationEmail from "@/components/emails/verification-email"
import PasswordResetEmail from "@/components/emails/reset-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
     emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      try {
       const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [user.email],
    subject: 'Verify your email address',
    react: VerificationEmail({ userName:user.name,verificationUrl:url }),
  });
  if(error){
    console.error('email send error:',error);
  }
}catch(err){
  console.error('Email exception:',err);
}
    },
    sendOnSignUp: true,
  },
    emailAndPassword:{
        enabled: true,
        sendResetPassword: async ({user, url, token}, request) => {
      await resend.emails.send({
        from:'Acme <onboarding@resend.dev>',
        to: [user.email],
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
        react:PasswordResetEmail({userName:user.name,resetUrl:url,requestTime:new Date().toLocaleString() }),
      });
    },
    },
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema
    }),
    plugins:[nextCookies()]
});