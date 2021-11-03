import { withIronSession } from 'next-iron-session'

export default function withSession(handler: any) {
  return withIronSession(handler, {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "fixrhythm",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production"
    }
  })
}