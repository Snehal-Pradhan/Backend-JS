// models/event.model.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/eventdb');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    tags: [
      {
        type: String,
        index: true
      }
    ]
  },
  {
    timestamps: true
  }
);

// Indexes
eventSchema.index({ date: 1, tags: 1 });         // Compound index for filtering           // Text index for full-text search

export const Event = mongoose.model('Event', eventSchema);
