import Jwt from "jsonwebtoken";

class CreateTokens {
  accessToken = (id: any, role: string) =>
    Jwt.sign(
      { _id: id, role },
       process.env.JWT_SECRET!, 
      { expiresIn: process.env.JWT_EXPIRE }
    );
}

const createTokens = new CreateTokens();
export default createTokens;
