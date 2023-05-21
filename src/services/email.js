import nodemailer from "nodemailer";
async function sendEmail(dest,subject,message,s=[]) {
    let transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.SENDEREMAIL, // generated ethereal user
        pass: process.env.SENDEREMAILPASSWORD, // generated ethereal password
      },
    });
    let info = await transporter.sendMail({
      from: `"Instagram" <${process.env.SENDEREMAIL}>`, // sender address
      to: dest, // list of receivers
      subject, // Subject line
      html:message, // html body
      attachments:s
    });
    return info;
}
export default sendEmail;