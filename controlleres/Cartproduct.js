const CartProductModel = require("../model/cartproductSchema");

const CartProductController = {
  getProduct: (request, response) => {
    CartProductModel.find({}, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL Server ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `successfully Cart get`,
          status: true,
          data: data,
        });
      }
    });
  },

  createProduct: (request, response) => {
    const body = request.body;
    console.log(body, "body");
    const { id, proImage, backImage, textOne, textTwo, price } = request.body;

    if (!id || !proImage || !backImage || !textOne || !textTwo || !price) {
      response.json({
        message: "Required Fields are Missing ",
        status: false,
      });
      return;
    }
    const objToSend = {
      id: id,
      proImage: proImage,
      backImage: backImage,
      textOne: textOne,
      textTwo: textTwo,
      price: price,
    };

    CartProductModel.create(objToSend, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Added to Cart`,
          status: true,
        });
      }
    });
  },

  deleteProduct: (request, response) => {
    const { id } = request.params;
    // console.log(id)
    CartProductModel.findByIdAndDelete(id, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL Server ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully remove from Cart`,
          status: true,
        });
      }
    });
  },

  updateProduct: (request, response) => {
    const body = request.body;
    console.log(body, "body");
    if (!body.todo) {
      response.json({
        message: "Required Fields are Missing ",
        status: false,
      });
      return;
    }
    const objToSend = {
      todo: body.todo,
    };

    CartProductModel.findByIdAndUpdate(body.id, objToSend, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `successfully update`,
          status: true,
        });
      }
    });
  },
};

module.exports = CartProductController;
