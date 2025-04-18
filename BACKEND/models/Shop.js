import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
       
    },
    slug: {
      type: String,
     
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
   
    afilink: 
      {
        type: String,
        
      }
    ,
    price: 
      {
        type: String,
        
      } // you can decide your price
    ,
    tags: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
     
    },
    comments: [
      {
        type: Schema.Types.ObjectId, ref: 'Comment' 
      },
    ],
  },
  { timestamps: true }
);

export const Shop = models.Shop || model("Shop", ProductSchema, 'shops');