import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Subcategories from "./subcategories.interface";
import SubcategoriesSchema from "./Subcategories.schema";

class SubcategoriesService {
  setCategoryId(req: Request, res: Response, next: NextFunction) {
    if (req.params.categoryId && !req.body.category) {
      req.body.category = req.params.categoryId;
    }
    next();
  }

  filterSubcategories(req: Request, res: Response, next: NextFunction) {
    const filterData: any = {};
    if (req.params.categoryId) {
      filterData.category = req.params.categoryId;
    }
    req.filterData = filterData;
    next();
  }

  getAll = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      let filterData: any = {};
      if (req.filterData) {
        filterData = req.filterData;
      }
      const subcategories: Subcategories[] = await SubcategoriesSchema.find(
        filterData
      );
      res.status(200).json({ data: subcategories });
    }
  );

  createOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategories: Subcategories = await SubcategoriesSchema.create(
        req.body
      );
      res.status(201).json({ data: subcategories });
    }
  );

  getOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategories: Subcategories | null =
        await SubcategoriesSchema.findById(req.params.id);
      res.status(200).json({ data: subcategories });
    }
  );

  updateOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategories: Subcategories | null =
        await SubcategoriesSchema.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
      res.status(200).json({ data: subcategories });
    }
  );

  deleteOne = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const subcategories: Subcategories | null =
        await SubcategoriesSchema.findByIdAndDelete(req.params.id);
      res.status(204).json();
    }
  );
}

const subcategoriesService = new SubcategoriesService();

export default subcategoriesService;
