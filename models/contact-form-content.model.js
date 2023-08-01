const mongoose = require("mongoose");

const contactFormContentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: String,
    company: String,
    regarding: String,
    message: String,
  },
  { timestamps: true }
);

const ContactFormContent = mongoose.model(
  "ContactFormContent",
  contactFormContentSchema
);

module.exports = ContactFormContent;
