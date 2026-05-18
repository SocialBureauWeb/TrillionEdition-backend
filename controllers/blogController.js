// controllers/blogController.js
const Blog = require("../models/Blog");
const slugify = require("slugify");

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      category,
      author,
      excerpt,
      content,
      seoTitle,
      seoDescription,
      keywords,
      relatedBlogs,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    
    const existingTitle = await Blog.findOne({ title });
    if (existingTitle) {
      return res.status(400).json({ message: "A blog with this title already exists" });
    }

    // Create slug
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let index = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${index++}`;
    }

    // Image URL (Cloudflare R2 Upload)
    let featuredImage = null;
    if (req.file) {
      // Prefer the uploaded location; if not present, build URL from public base
      featuredImage = req.file.location || `${process.env.R2_PUBLIC_URL.replace(/^https?:\/\//, '')}/${req.file.filename}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      featuredImage,
      seoTitle,
      seoDescription,
      keywords: keywords ? keywords.split(",").map(k => k.trim()) : [],
      relatedBlogs: relatedBlogs ? relatedBlogs.split(",").map(i => i.trim()) : [],
    });

    res.status(201).json({
      message: "Blog created successfully!",
      blog,
    });

  } catch (err) {
    // Handle duplicate key (unique index) errors gracefully
    if (err && err.code === 11000) {
      const dupField = Object.keys(err.keyValue || {})[0] || 'field';
      return res.status(409).json({ message: `${dupField} already exists` });
    }

    // Validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join('; ');
      return res.status(400).json({ message: messages || 'Validation error' });
    }

    // Fallback
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
