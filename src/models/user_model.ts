import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "./token_model";

/*
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
 */

@Entity("user")
export class User {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ name: "email", nullable: false, type: "text", unique: true })
   email: string;

   @Column({ name: "password", type: "text", nullable: false })
   password: string;

   @Column({ name: "is_activated", default: false, type: "boolean" })
   is_activated: boolean;

   @Column({ name: "activation_link", type: "text", nullable: true })
   activation_link: string;

   @OneToOne(() => Token)
   @JoinColumn()
   token: Token

}
