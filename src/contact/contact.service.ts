import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import * as nodemailer from 'nodemailer';
import { env } from 'process';

@Injectable()
export class ContactService {
  async create(createContactDto: CreateContactDto): Promise<string> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.USER_EMAIL,
        pass: env.USER_PASSWORD,
      },
    });
    const { email, phone, message, name } = createContactDto;

    const mailOptions = {
      from: email,
      to: env.USER_EMAIL,
      subject: 'ManuelDev Contacto',
      text: `Nombre: ${name} \n Email: ${email} \n Telefono: ${phone} \n Mensaje: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return 'ok';
    } catch (error) {
      return 'error';
    }
  }
}
