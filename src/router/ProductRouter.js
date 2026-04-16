import { Router } from "express";
import ProductController from "../controller/ProductController.js";

const productRouter = Router();

productRouter.get("/", ProductController.getAllProducts);

productRouter.post("/create-product", ProductController.createdProduct);

productRouter.put("/edit-product", ProductController.editProduct);

productRouter.delete("/delete-product/:id", ProductController.deleteProduct);

export default productRouter;
