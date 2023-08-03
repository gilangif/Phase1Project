const { Account, User } = require("../models");
const bcrypt = require("bcrypt");

class Auth {
  static login(req, res) {
    const { message, email, password } = req.query 
    res.render("login", { title: "Login", message, email, password });
  }

  static loginSubmit(req, res) {
    const { email, password } = req.body
    
    Account.findOne({ where: { email } })
      .then((result) => {
        if (!result) {
          res.redirect(`/auth/login?message=Email%20not%20found%20!&&email=${email}&&password=${password}`)
        } else {
          bcrypt.compare(password, result.password, (err, data) => {
            if (!data) {
              res.redirect(`/auth/login?message=Invalid%20Password%20!&&email=${email}&&password=${password}`)
            } else {
              req.session.login = { result }
              req.session.loginid = result.id
              res.redirect("/posts")
            }
          })
        }
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
          res.redirect(`/auth/login?message=${err.errors.map((error) => error.message).join(";")}`)
        } else {
          console.log(err);
          res.send(err)
        }
      })

  }
  
  static register(req, res) {
    const { signup, name, date, gender, phone, email, password } = req.query
    res.render("register", { title: "Register", signup, name, date, gender, phone, email, password });
  }

  static async registerSubmit(req, res) {
    const { name, date, gender, phone, email, password } = req.body;

    if (!name || !date || !gender || !phone || !email || !password) {
      return res.redirect(`/auth/register?signup=All%20form%20required%20!&&name=${name}&&date=${date}&&gender=${gender}&&phone=${phone}&&email=${email}&&password=${password}`)
    }
    
    Account.create({ email, password })
      .then((data) => User.create({ name, date, gender, phone, AccountId: data.id }))
      .then((data) => res.redirect(`/auth/login?message=${data.name}%20success%20registered`))
      .catch((err) => {
        console.log(err);
        if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
          res.redirect(`/auth/register?signup=${err.errors.map((error) => error.message).join(";")}&&name=${name}&&date=${date}&&gender=${gender}&&phone=${phone}&&email=${email}&&password=${password}`)
        } else {
          res.send(err)
        }
      });
  }

  static logout(req, res) {
    delete req.session.login
    res.redirect("/")
  }
}


const verify = (req, res, next) => {
  if (req.session.login) {
    next()
  } else {
    res.redirect(`/auth/login?message=You%20mus't%20login%20for%20access%20post%20!`)
  }
}

module.exports = { Auth, verify };
