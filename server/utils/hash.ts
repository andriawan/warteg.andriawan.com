import { scryptSync, randomBytes, timingSafeEqual , createHash , randomUUID } from "crypto";

export const MD5 = (stringParam : string | number ) => createHash('md5').update( `${stringParam}` , 'binary').digest('hex')

export const UUID = () => randomUUID()

export class Password {

  static hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = scryptSync(password, salt + process.env.APP_SECRET , 64) ;
    return `${buf.toString("hex")}.${salt}`;
  }

  static comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    // split() returns array
    const [hashedPassword, salt] = storedPassword.split(".");
    // we need to pass buffer values to timingSafeEqual
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    // we hash the new sign-in password
    const suppliedPasswordBuf = scryptSync(suppliedPassword, salt + process.env.APP_SECRET , 64);
    // compare the new supplied password with the stored hashed password
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  }

}