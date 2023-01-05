import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user_model";

/*
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
 */

@Entity()
export class Token {
   @PrimaryGeneratedColumn("uuid")
   id: string

   @Column({ name: "refresh_token", type: "text" })
   refresh_token: string;

   @OneToOne(() => User)
   user: User
}
