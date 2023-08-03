class Controller {
  static home(req, res) {
    res.render("home", { title: "Home" })
  }
}

module.exports = Controller