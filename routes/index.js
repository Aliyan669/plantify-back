const TodoModel = require("../model/todoSchema");
const ProductModel = require("../model/productSchema");

var express = require("express");
const TodoController = require("../controlleres/todo");
// const ProductController = require('../controlleres/product');
const FavProductController = require("../controlleres/Favoriteproduct");
const CartProductController = require("../controlleres/Cartproduct");

var router = express.Router();

router.get("/api/test", (request, response) => {
  response.send("test");
});

router.post("/api/todo", TodoController.postTodo);

router.get("/api/todo", TodoController.getTodo);

router.delete("/api/todo/:id", TodoController.deleteTodo);

router.put("/api/todo", TodoController.updateTodo);

router.post("/api/signup", TodoController.signup);

router.post("/api/login", TodoController.login);

router.post("/api/favoriteproduct", FavProductController.createProduct);

router.get("/api/favoriteproduct", FavProductController.getProduct);

router.delete("/api/favoriteproduct/:id", FavProductController.deleteProduct);

router.post("/api/cartproduct", CartProductController.createProduct);

router.get("/api/cartproduct", CartProductController.getProduct);

router.delete("/api/cartproduct/:id", CartProductController.deleteProduct);

module.exports = router;
