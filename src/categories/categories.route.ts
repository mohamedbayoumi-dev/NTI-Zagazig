import { Router } from "express";
import categoriesService from "./categories.service";
import subcategoriesRouter from "../subcategories/subcategories.route";
import categoriesValidation from "./categories.validation";

const categoriesRouter:Router = Router()


// /api/v1/categories/categoryId                ====>   categories
// /api/v1/categories/categoryId/subcategories  ====>   subcategories

categoriesRouter.use('/:categoryId/subcategories' , subcategoriesRouter)

categoriesRouter.route('/')
.get(categoriesService.getAll)
.post(categoriesValidation.createOne,categoriesService.createOne)

categoriesRouter.route('/:id')
.get(categoriesValidation.getOne,categoriesService.getOne)
.put(categoriesValidation.updateOne,categoriesService.updateOne)
.delete(categoriesValidation.deleteOne,categoriesService.deleteOne)
export default categoriesRouter;