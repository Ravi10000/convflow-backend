const ContactFormContent = require("../models/contact-form-content.model.js");
const sendEmail = require("../utilities/emailer.js");

module.exports.addContactFormContent = async (req, res, next) => {
  try {
    const { name, email, title, company, regarding, message } = req.body;

    const formContent = await ContactFormContent.create({
      ...(name && { name }),
      ...(email && { email }),
      ...(title && { title }),
      ...(company && { company }),
      ...(regarding && { regarding }),
      ...(message && { message }),
    });
    if (!formContent) throw new Error("Error creating contact form content");
    const emailRes = await sendEmail({
      to: "ravisince2k@gmail.com",
      subject: "New Contact Form Content",
      formContent,
    });
    console.log({ emailRes });
    res.status(201).json({
      status: "success",
      formContent,
    });
  } catch (err) {
    next(err);
  }
};
