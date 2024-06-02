const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const User = require("../schema/info");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqyxs6ndi',
  api_key: '871623547157465',
  api_secret: 'gSIHKZVw4Q0NAM88jf2q3Vot5t8',
});



// Set up Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures',
    format: async (req, file) => 'jpg', // supports promises as well
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

const upload = multer({ storage });

// Upload profile picture
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update only profilePicture and profilePictureUrl fields
    user.profilePicture = req.file.filename;
    user.profilePictureUrl = req.file.path;
    await user.save();

    res.status(200).send({ filename: req.file.filename, url: req.file.path });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/upload-bg-picture', upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const { userId } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Update only profilePicture and profilePictureUrl fields
      user.bgPicture = req.file.filename;
      user.bgPictureUrl = req.file.path;
      await user.save();
  
      res.status(200).send({ filename: req.file.filename, url: req.file.path });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

// Fetch profile picture URL
router.get('/profile-picture/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (user && user.profilePictureUrl) {
      res.status(200).send({ url: user.profilePictureUrl,url2:user.bgPictureUrl });
    } else {
      res.status(404).send('Profile picture not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
