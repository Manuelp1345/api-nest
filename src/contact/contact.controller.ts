import { Controller, Post, Body, Res } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto, @Res() res) {
    const sendEmail = await this.contactService.create(createContactDto);
    if (sendEmail === 'ok') {
      res.status(200).json({
        ok: true,
        message: 'Email enviado correctamente',
      });
    }
    if (sendEmail === 'error') {
      res.status(400).json({
        ok: false,
        message: 'Error al enviar el email',
      });
    }
  }
}
