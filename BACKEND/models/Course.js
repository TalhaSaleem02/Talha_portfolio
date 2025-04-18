import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const CourseSchema = new Schema(
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

export const Course = models.Course || model("Course", CourseSchema, 'courses');