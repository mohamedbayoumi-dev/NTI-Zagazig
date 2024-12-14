import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import usersSchema from "../users/users.schema";
import createTokens from "../utils/tokens";
import ApiErrors from "../utils/apiErrors";

class AuthService {
  signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await usersSchema.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
      });

      const token = createTokens.accessToken(user._id, user.role);
      res.status(201).json({ token, data: user });
    }
  );

  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await usersSchema.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });

      if (
        !user ||
        user.hasPassword == false ||
        !(await bcrypt.compare(req.body.password, user.password))
      ) {
        return next(new ApiErrors(`${req.__("invalid_login")}`, 400));
      }
      const token = createTokens.accessToken(user._id, user.role);
      res.status(201).json({ token, data: user });
    }
  );

  adminLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = await usersSchema.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
        role: { $in: ["admin", "employee"] },
      });

      if (
        !user ||
        user.hasPassword == false ||
        !(await bcrypt.compare(req.body.password, user.password))
      ) {
        return next(new ApiErrors(`${req.__("invalid_login")}`, 400));
      }
      const token = createTokens.accessToken(user._id, user.role);
      res.status(201).json({ token, data: user });
    }
  );
}

const authService = new AuthService();
export default authService;
