import {
   Entity,
   BaseEntity,
   Column,
   PrimaryColumn,
   CreateDateColumn,
   UpdateDateColumn,
   PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Person extends BaseEntity {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   first_name: string;

   @Column()
   last_name: string;


   @Column()
   middle_name: string;

   @Column({
      unique: true
   })
   email: string;

   @Column({
      unique: true,
      length: 10
   })
   card_number: string;

   @Column({
      type: "numeric"
   })
   balance: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;
}