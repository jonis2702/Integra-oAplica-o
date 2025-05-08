import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column()
  birthDate!: Date;

  @Column({ unique: true })
  registration!: string;

  @Column()
  password!: string;

  @OneToOne(() => Contact, (contact) => contact.user)
  contact!: Contact;
}