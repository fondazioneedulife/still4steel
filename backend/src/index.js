import nodemailer from 'nodemailer';

    // Configura il trasportatore per le email
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { 
            user: 'alessandronicolis1@gmail.com', 
            pass: 'bqae bpij mill dhmk'
        },
    });

    // Invia email
    await transporter.sendMail({
        from: "alessandronicolis1@gmail.com",
        to: "ggiulia.mmazzi@gmail.com",
        subject: "Recupero password",
        html: `<p>Per reimpostare la tua password, clicca qui: Reset Password</p>`,
    }).then(() => {
        console.log('email sent');
    }).catch(err => {
        console.error(err);
    })