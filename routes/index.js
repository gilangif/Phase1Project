const express = require("express");
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const router = express.Router();
const { Auth, verify } = require("../controllers/auth");
const Controller = require("../controllers");

router.get("/auth/login", Auth.login);
router.post("/auth/login", Auth.loginSubmit);
router.get("/auth/register", Auth.register);
router.post("/auth/register", Auth.registerSubmit);
router.get("/auth/logout", Auth.logout);

router.get("/", Controller.home);

router.get("/posts", verify, (req, res) => {
  res.send("kalau lihat pesan ini berarti sudah login")
});



let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb)  => {
    // console.log(file.fieldname);
    cb(null, file.originalname)
  }
})

let upload = multer({ storage: storage })



router.get("/uploads", (req, res) => {
  res.render("upload", { title: "coba multer" })
})

router.post("/uploads", upload.single('avatar'), (req, res) => {
  // console.log(req.file);
  res.send("ok")
})


module.exports = router;

