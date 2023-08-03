const dateFormater = (val) => {
  let now = new Date(val)
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let date = now.getDate()

  if (month < 10) month = "0" + month
  if (date < 10) month = "0" + date

  return `${year}-${month}-${date}`
}

module.exports = { dateFormater }