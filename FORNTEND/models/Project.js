import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const projectSchema = new Schema(
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
    client: {
      type: String,
    },
    projectCategory: [
      {
        type: String,
        default: []
        
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

export const Project = models.Project || model('Project', projectSchema, 'projects');