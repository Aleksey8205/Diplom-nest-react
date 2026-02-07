export const jwtConstants = {
  secret: process.env.JWT_CODE! || "eyJhbGciOiJIUzI", 
  expiresIn: 3600, 
  };