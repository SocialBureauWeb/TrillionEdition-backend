// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: String,
  author: String,
  excerpt: String,
  content: { type: String, required: true },
  featuredImage: { type: String }, // Cloudinary URL
  seoTitle: String,
  seoDescription: String,
  keywords: [String],
  relatedBlogs: [String],
  featured: { type: Boolean, default: false },
  includeInNewsletter: { type: Boolean, default: false },
  scheduledAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
