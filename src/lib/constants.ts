import dotenv from 'dotenv'
dotenv.config()

// KING
export const NODE_ENV: string = process.env.NODE_ENV || ''

const databaseUrl =
  NODE_ENV === 'development' ? process.env.DATABASE_URL : process.env.DATABASE_URL_TEST

export const DATABASE_URL: string = databaseUrl || ''
export const DATABASE_URL_TEST: string = process.env.DATABASE_URL_TEST || ''
export const JWT_SECRET = process.env.JWT_SECRET_KEY || ''
export const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET