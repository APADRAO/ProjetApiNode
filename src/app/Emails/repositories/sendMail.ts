import nodemailer from 'nodemailer';
import { Return } from '../../../database/entities/Return';

const enviaEmail = async (to:string, subject:string, body:string): Promise<string> =>{
  // Configuração do transportador SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: 'demarcopadrao@outlook.com',
      pass: 'qng6kUKbyXD1EtB3',
    },
  });

  // Configuração do e-mail
  const mailOptions = {
    from: 'api-email@api.com',
    to,
    subject,
    text:body
  };

  try {
    // Envio do e-mail
    const info = await transporter.sendMail(mailOptions);
   
      return `E-mail enviado: ${info.messageId}`;
 } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return `E-mail enviado: ${error}`
  }
}

export {enviaEmail};
