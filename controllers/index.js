const { ValidationErrorItemOrigin } = require("sequelize");
const { Post, Tag, PostTag, User } = require("../models/");

class Controller {
  static home(req, res) {
    res.render("home", { title: "Homepage", login: req.session.login });
  }

  static post(req, res) {
    User.getUserFromStatic(Post, PostTag, Tag)
      .then((data) => {
        // res.send(data)
        res.render("post", { title: "Homepage", data });
      })
      .catch((err) => {
        res.send(err.message);
      });
  }

  static showAddPosting(req, res) {
    const { errors } = req.query;
    Tag.findAll({})
      .then((data) => {
        res.render("addpost", { title: "Add Post", data, errors });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static postAddPosting(req, res) {
    const { title, post, img, tag } = req.body;
    let path;

    if (req.file)
      path = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;

    Post.create({ title, post, img: path, UserId: req.session.loginid })
      .then((data) => PostTag.create({ PostId: data.id, TagId: tag }))
      .then((data) => res.redirect("/posts"))
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.redirect(
            `/posts/add?errors=` + err.errors.map((el) => el.message).join(";")
          );
        } else {
          res.send(err);
        }
      });
  }

  static showUpdatePosting(req, res) {
    const { errors } = req.query;
    let detailpost;
    let detailtag;
    Post.findAll({
      include: {
        model: Tag,
      },
      where: {
        id: req.params.postId,
      },
    })
      .then((data) => {
        detailpost = data[0];
        detailtag = data[0].Tags[0];
        return Tag.findAll();
      })
      .then((data) => {
        res.render("editpost", {
          title: "Edit Post",
          detailpost,
          detailtag,
          data,
          errors,
        });
      })

      .catch((err) => res.send(err));
  }

  static postUpdatePosting(req, res) {
    const { title, post, img, tag } = req.body;
    const { postId } = req.params;
    Post.update(
      { title, post, img, UserId: req.session.loginid },
      { where: { id: +postId } }
    )
      .then((data) => {
        let id = data.id;
        return PostTag.update(
          { PostId: postId, TagId: tag },
          {
            where: {
              PostId: postId,
            },
          }
        );
      })
      .then((data) => {
        res.redirect("/posts");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          res.redirect(
            `/posts/edit/${postId}?errors=` +
              err.errors.map((el) => el.message).join(";")
          );
        } else {
          res.send(err);
        }
      });
  }

  static deletePosting(req, res) {
    const { postId } = req.params;
    Post.destroy({
      where: {
        id: postId,
      },
    })
      .then((data) => {
        res.redirect("/posts");
      })
      .catch((err) => {
        res.send(err.message);
      });
  }
}

module.exports = Controller;
