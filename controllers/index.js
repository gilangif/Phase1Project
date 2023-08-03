const { Post, Tag, PostTag, User } = require('../models/')


class Controller {
    static home(req, res) {
        res.render("home", { title: "Homepage" })
    }

    static post(req, res) {
        User.findAll({
            include: {
                model: Post,
                include: {
                    model: PostTag,
                    include: {
                        model: Tag
                    }
                }
            }
        })
            .then((data) => {
                // res.send(data)
                res.render('post', { title: "Homepage", data })
            })
            .catch((err) => {
                res.send(err.message)
            })
    }

    static showAddPosting(req, res) {
        const { errors } = req.query
        Tag.findAll({})
            .then((data) => {
                res.render('addpost', { data, errors })
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static postAddPosting(req, res) {
        const { title, post, img, tag } = req.body
        Post.create({ title, post, img, UserId: "4" }) //UserId:"4" hardcode. nanti diganti menjadi id account/user
            .then((data) => {
                let id = data.id 
                return PostTag.create({ PostId: id, TagId: tag })
            })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => { //validasi error untuk add
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/posts/add?errors=` + errors.join(';'))
                } else {
                    res.send(err)
                }
            })
    }



    static showUpdatePosting(req, res) {
        let detailpost
        let detailtag
        Post.findAll({
            include: {
                model: Tag,
            },
            where: {
                id: req.params.postId,
            }
        })
            .then((data) => { //chain promise
                detailpost = data[0]
                detailtag = data[0].Tags[0]
                return Tag.findAll()
            })
            .then((data) => {
                res.render('editpost', { detailpost, detailtag, data })
            })

            .catch((err) => {
                res.send(err)
            })

    }

    static postUpdatePosting(req, res) {
        const { title, post, img, tag } = req.body
        const { postId } = req.params
        Post.update({ title, post, img, UserId: "4" }, {  //misalkan  UserId:"4" hardcode. nanti diganti menjadi id account/user
            where: {
                id: +postId
            }
        })
            .then((data) => {
                let id = data.id
                return PostTag.update({ PostId: postId, TagId: tag }, {
                    where: {
                        PostId: postId
                    }
                })
            })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err);
            })
    }

    static deletePosting(req, res) {
        const { postId } = req.params
        Post.destroy({
            where: {
                id: postId
            }
        })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err.message)
            })
    }



}


module.exports = Controller