import jwt from "jsonwebtoken";
import { Token } from "../models/token_model";

class TokenService {
   generateTokens(payload: string) {
      const accessToken = jwt.sign(
         payload,
         process.env.JWT_ACCESS_SECRET as string,
         {
            expiresIn: "30m",
         }
      );

      const refreshToken = jwt.sign(
         payload,
         process.env.JWT_REFRESH_SECRET as string,
         {
            expiresIn: "30d",
         }
      );

      return {
         accessToken,
         refreshToken,
      };
   }

   // У 1 юзера 1 токен.
   // Если зайти с другого девайса, токен перезатрется
   // TODO реализовать функционал, не забывать чистить протухшие токены с базы
   async saveToken(userId: string, refreshToken: string) {
      const tokenData = await Token.findOneBy({ id: userId });

      if (tokenData) {
         await Token.save({
            refresh_token: refreshToken,
         });
      }
   }
}

export default new TokenService();
