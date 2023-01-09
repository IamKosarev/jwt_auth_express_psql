import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user_model";

/*
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
 */

@Entity()
export class Token extends BaseEntity {

   @PrimaryGeneratedColumn()
   id: string

   @Column({ name: "refresh_token", type: "text" })
   refresh_token: string;
}
