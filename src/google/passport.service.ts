import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import usersSchema from "../users/users.schema";
import tokens from "../utils/tokens";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await usersSchema.findOne({ googleId: profile.id });
        if (!user) {
          let checkUser = await usersSchema.findOne({
            email: profile._json.email,
          });
          if (checkUser) {
            if (
              (!checkUser.image ||
                checkUser.image.split("/").pop() === "user-default.png") &&
              profile._json.picture
            )
              checkUser.image = profile._json.picture;
            else
              checkUser.image = checkUser.image.split(
                `${process.env.BASE_URL}/images/users/`
              )[1];
            checkUser.googleId = profile.id;
            await checkUser.save({ validateModifiedOnly: true });
          } else {
            checkUser = await usersSchema.create({
              name: profile._json.name,
              email: profile._json.email,
              image: profile._json.picture,
              hasPassword: false,
              googleId: profile.id,
            });
          }
          user = checkUser;
        }
        const token = tokens.accessToken(user?._id, user?.role!);
        done(null, { token });
      } catch (err) {
        done(err, false);
      }
    }
  )
);
