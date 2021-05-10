module.exports = (req, res, next) => {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Huit caractères au minimum, au moins une lettre majuscule, une lettre minuscule et un chiffre

  if (passwordReg.test(req.body.password)) {
    next();
  } else {
    res.statusMessage = "Le mot de passe doit contenir huit caractères au minimum, au moins une lettre et un chiffre";
    res.status(400).end();
  }
};