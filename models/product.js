const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ingrese el nombre del producto"],
    trim: true,
    maxLength: [100, "El nombre no puede tner mas de 100 cararteres"],
  },
  price: {
    type: Number,
    required: [true, "Ingrese el precio del producto"],
    maxLength: [5, "El precio no puede ser mayor de 99.999"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Ingrese la descripción del producto"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Ingrese la categoría del producto"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Elija la categoría correcta",
    },
  },
  seller: {
    type: String,
    required: [true, "Ingrese el vendedor del producto"],
  },
  stock: {
    type: Number,
    required: [true, "Ingrese el stock del Producto"],
    maxLength: [5, "el stock no puede sr mayor que 99.999"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
