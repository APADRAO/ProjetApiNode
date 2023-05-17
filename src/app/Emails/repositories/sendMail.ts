import nodemailer from 'nodemailer';
import { Return } from '../../../database/entities/Return';

const enviaEmail = async (to:string, subject:string, body:string): Promise<string|Error> =>{
  // Configuração do transportador SMTP
  const transporter = await nodemailer.createTransport({
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
      return `E-mail enviado de: ${info.envelope.from} para: ${info.envelope.to}`;
 } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    return new Error(`E-mail enviado: ${error}`);
  }
}

export {enviaEmail};
