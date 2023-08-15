const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                auth:{
                    user: "stillirise27iitism@gmail.com",
                    pass: "dbozhcqggsazlztw",
                }
            })


            let info = await transporter.sendMail({
                from: 'Udemy -Anmol Pal',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;