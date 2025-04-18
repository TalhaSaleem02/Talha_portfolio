import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const CoursesSchema = new Schema(
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
    videos: [
      {
        type: String,
        default: []
      },
    ],
    description: {
      type: String,
    },
    instructor: {
      type: String,
    },
    projectCategory: [
      {
        type: String,
        
        
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    livePreview: {
      type: String,
    },
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

export const Courses = models.Courses || model("Courses", CoursesSchema, 'courses');