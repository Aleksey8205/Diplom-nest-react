export const jwtConstants = {
  secret: process.env.JWT_CODE! || "eyJhbGciOiJIUzI", 
  expiresIn: 60, //потом поправить
  };