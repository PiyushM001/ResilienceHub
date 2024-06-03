const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const User = require("../schema/info");
const User2 = require("../schema/post");

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


  router.post('/post', upload.single('profilePicture'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const { _userid } = req.body;
  
    try {
      const user = await User.findById(_userid);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const post = await User2.create({
              _userid: _userid,
              profilephoto:user.profilePictureUrl,
              IngameName:user.IngameName,
              RealName:user.RealName,

              description: req.body.description,
              PostUrl: req.file.path
            })
      // Update only profilePicture and profilePictureUrl fields
       user.posts.push({postid:post._id})
      // user.bgPictureUrl = req.file.path;
       await user.save();
  
      res.status(200).send({url: req.file.path});
    } catch (error) {
      res.status(500).send('Server error');
    }
  });



  // router.post('/post', upload.single('profilePicture'), async (req, res) => {
  //   if (!req.file) {
  //     return res.status(400).send('No file uploaded.');
  //   }
  
    
  

  //   try {
  //     const post = await User2.create({
  //       _userid: req.body._userid,
  //       IngameName:req.body.IngameName,
  //       RealName:req.body.RealName,
  //       description: req.body.description,
  //       PostUrl:req.body.PostUrl
  //     })
  
  
  //     res.status(200).send({ filename: req.file.filename, url: req.file.path});
  //   } catch (error) {
  //     res.status(500).send('Server error');
  //   }
  // });



module.exports = router;
