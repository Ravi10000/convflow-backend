const { body } = require("express-validator");
const {
  addContactFormContent,
} = require("../controllers/contact-form-content.controller");
const validateReq = require("../middlewares/validate-req");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/", addContactFormContent);

module.exports = router;
