const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const upload = require('../utils/uploadmiddleware'); // multer + cloudinary middleware

// Route to fetch all faculty
router.get('/', async (req, res) => {
  try {
    const facultyList = await Faculty.find();
    res.status(200).json(facultyList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching faculty data' });
  }
});

// Route to add new faculty with image upload
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, department, designation, contactInfo, email } = req.body;
    const photo = req.file?.path; // Cloudinary URL

    const newFaculty = new Faculty({
      name,
      photo,
      department,
      designation,
      contactInfo,
      email,
    });

    const savedFaculty = await newFaculty.save();
    res.status(201).json(savedFaculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving faculty data' });
  }
});
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const facultyId = req.params.id;
    const { name, department, designation, contactInfo, email } = req.body;
    const photo = req.file ? req.file.path : undefined;

    const updateData = { name, department, designation, contactInfo, email };
    if (photo) updateData.photo = photo;

    const updatedFaculty = await Faculty.findByIdAndUpdate(facultyId, updateData, {
      new: true,
    });

    if (!updatedFaculty) return res.status(404).json({ error: "Faculty not found" });

    res.status(200).json(updatedFaculty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating faculty data" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    // If you store Cloudinary public_id (e.g., faculty.cloudinaryId), delete it here:
    if (faculty.cloudinaryId) {
      await cloudinary.uploader.destroy(faculty.cloudinaryId);
    }

    await faculty.deleteOne();

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
