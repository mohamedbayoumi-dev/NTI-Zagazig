import refactorService from "../refactor.service";
import Products from "./products.interface";
import productsSchema from "./products.schema";


class ProductsService{

  getAll = refactorService.getAll<Products>(productsSchema)
  createOne = refactorService.createOne<Products>(productsSchema)
  getOne = refactorService.getOne<Products>(productsSchema)
  updateOne = refactorService.updateOne<Products>(productsSchema)
  deleteOne = refactorService.deleteOne<Products>(productsSchema)
  
}

const productsService = new ProductsService();
export default productsService;