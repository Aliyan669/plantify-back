const FavProductModel = require("../model/favproductSchema");

const FavProductController = {
  getProduct: (request, response) => {
    FavProductModel.find({}, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL Server ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `successfully get`,
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

    FavProductModel.create(objToSend, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Added to Favorite`,
          status: true,
        });
      }
    });
  },

  deleteProduct: (request, response) => {
    const { id } = request.params;
    // console.log(id)
    FavProductModel.findByIdAndDelete(id, (error, data) => {
      if (error) {
        response.json({
          message: `INTERNAL Server ERROR${error}`,
          status: false,
        });
      } else {
        response.json({
          message: `Successfully remove from Favorite`,
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

    FavProductModel.findByIdAndUpdate(body.id, objToSend, (error, data) => {
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

module.exports = FavProductController;
