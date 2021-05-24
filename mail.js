import nodemailer from 'nodemailer'

export const constructEmail = (available) => {
  let body = `<h2> COVAXIN Available at following slots </h2> \n`

  for(var i=0;i<available.length;i++){
    let slot = `<p style="margin:10px"> ${JSON.stringify(available[i])} </p>`
    body += slot
  }

  return body
}


export const mail = async (body) => {

  const transport = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    // port: process.env.EMAIL_PORT,
    service: "Gmail",
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASSWORD
    }
  });  

  let message = {
    from: process.env.SENDER, 
    to: process.env.RECIEVER,
    subject: "COVAXIN Available in Indore for 18+",
    html: body
  }

  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log("Email sent succesfully")
      console.log(info);
    }
  })

}