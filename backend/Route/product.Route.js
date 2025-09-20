import { Router } from "express";
import productController from "../Controller/product.Controller.js";
const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getOneProduct);

router.get('/most-favourite', productController.getMostFavourite);

router.get('/top-rating', productController.getTopRating);

export default router;