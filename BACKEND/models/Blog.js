import mongoose from 'mongoose';


const { image } = require('faker');
const {Schema, models, model} = require('mongoose');

const BlogSchema = new Schema({ 
    title : {
        type: String,
        
    },
    slug : {
        type: String,
        
    },
    images : [{
        type: String,
        
    }],
    description : {
        type: String,
        
    },
    blogcategory : [{
        type: String,
        
    }],
    tags : [{
        type: String,
        
    }],
    status : {
        type: String,
        
    },
    comments : [{
        type: Schema.Types.ObjectId, ref: 'Comment' 
        
    }],

}, {timestamps: true});


export const Blog = models.Blog || model('Blog', BlogSchema, 'blogs');