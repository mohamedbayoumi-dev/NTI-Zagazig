import { Application, Request, Response, NextFunction } from "express";
import categoriesRouter from "./categories/categories.route";
import subcategoriesRouter from "./subcategories/subcategories.route";
import globalErrors from "./middlewares/globalErrors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from "./products/products.route";
import usersRouter from "./users/users.route";
import authRouter from "./auth/auth.route";

declare module "express" {
  interface Request {
    filterData?: any;
    files?:any;
  }
}

const mountRoutes = (app: Application) => {
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/api/v1/subcategories", subcategoriesRouter);
  app.use("/api/v1/products", productsRoute);
  app.use("/api/v1/users", usersRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", usersRouter);

  //  Handle Error Route
  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new ApiErrors(`Route ${req.originalUrl} Not Found`,400));
  });
  app.use(globalErrors);

  
};

export default mountRoutes;
