const express = require("express");
const multer  = require('multer')

const router = express.Router();
const Controller = require("../controllers");

const { Auth, verify } = require("../controllers/auth");

let storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads') },
  filename: (req, file, cb)  => { cb(null, file.originalname) }
})

let upload = multer({ storage: storage })

router.get("/auth/login", Auth.login);
router.post("/auth/login", Auth.loginSubmit);
router.get("/auth/register", Auth.register);
router.post("/auth/register", Auth.registerSubmit);
router.get("/auth/logout", Auth.logout);
router.get("/", Controller.home);

router.get("/posts", verify, Controller.post);
router.get('/posts/delete/:postId', verify, Controller.deletePosting)

router.get('/posts/add', verify, Controller.showAddPosting)
router.post('/posts/add', upload.single('avatar'), Controller.postAddPosting)

router.get('/posts/edit/:postId', verify, Controller.showUpdatePosting)
router.post('/posts/edit/:postId', Controller.postUpdatePosting)












router.get("/uploads", (req, res) => {
  res.render("upload", { title: "coba multer" })
})

router.post("/uploads", upload.single('avatar'), (req, res) => {
  console.log(req.file);  
  res.send("ok")
})


module.exports = router;

