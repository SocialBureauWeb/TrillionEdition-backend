const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudflare");
const Blog = require("../models/Blog");
const { createBlog, getBlogs, getBlogBySlug } = require("../controllers/blogController");

// Create blog (only ONE route)
router.post("/create", upload.single("featuredImage"), createBlog);

// Get all blogs
router.get("/", getBlogs);

// Check title uniqueness (must be before slug route)
router.get('/check-title', async (req, res) => {
  try {
    const { title } = req.query || {};
    if (!title || !title.trim()) return res.json({ unique: true });

    // case-insensitive exact match
    const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${escaped}$`, 'i');
    const existing = await Blog.findOne({ title: regex });
    return res.json({ unique: !existing });
  } catch (err) {
    // Do not throw; respond safe default and avoid noisy console errors
    return res.json({ unique: true });
  }
});


router.get('/:slug', getBlogBySlug);


router.get("/blogs/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
