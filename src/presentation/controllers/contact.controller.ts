import { Request, Response } from "express";
import { Contact } from "../../core/entities/contact.entity";
import { getRepository } from "typeorm";
import { CreateContactDTO } from "../../infrastructure/dtos/contact.dto";

export class ContactController {
  static async create(req: Request, res: Response) {
    try {
      const contactData: CreateContactDTO = req.body;
      const contact = new Contact();
      Object.assign(contact, contactData);

      const contactRepository = getRepository(Contact);
      const createdContact = await contactRepository.save(contact);

      res.status(201).json({
        id: createdContact.id,
        email: createdContact.email
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}