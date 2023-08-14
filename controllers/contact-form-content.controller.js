const ContactFormContent = require("../models/contact-form-content.model.js");
const sendEmail = require("../utilities/emailer.js");

module.exports.addContactFormContent = async (req, res, next) => {
  try {
    const { name, email, phone, company, title, message } = req.body;

    const formContent = await ContactFormContent.create({
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(company && { company }),
      ...(title && { title }),
      ...(message && { message }),
    });
    if (!formContent) throw new Error("Error creating contact form content");

    console.log({ formContent });
    res.status(201).json({
      status: "success",
      formContent,
    });
    const emailRes = await sendEmail({
      to: "ravisince2k@gmail.com",
      subject: "New Contact Form Content",
      formContent,
    });
    console.log({ emailRes });
  } catch (err) {
    next(err);
  }
};
