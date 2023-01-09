import { User } from "../models/user_model";
import { Like } from "typeorm";
import bcrypt from "bcrypt";
import uuid from "uuid";
import MailService from "./mailService";
import mailService from "./mailService";

class UserService {
   async registration(email: string, password: string) {
      const candidate = await User.findOne({
         where: {
            email: Like(`%${email}%`),
         },
      });

      if (candidate) {
         throw new Error(
            `Пользователь с почтовым адресом ${email} уже существует`
         );
      }

      // Соль?
      const hashPassword = await bcrypt.hash(password, 3);
      const activationLink = uuid.v4();

      // Хорошая ли практика генерить uuid на сервере, а не в базе?
      const user = await User.create({
         email,
         password: hashPassword,
         activation_link: activationLink,
      });

      await mailService.sendActivationMail(email, activationLink)
   }
}

export default new UserService();
