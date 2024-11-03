import jwt from 'jsonwebtoken'
import { jwtSecret, jwtExpires } from '../config/index.js'

// create a token
export const signToken = (fullname, email, role, id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpires,
  })
}
