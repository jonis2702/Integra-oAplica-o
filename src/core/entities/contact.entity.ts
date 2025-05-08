import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  phone!: string;

  @OneToOne(() => User, (user) => user.contact)
  @JoinColumn()
  user!: User;
}