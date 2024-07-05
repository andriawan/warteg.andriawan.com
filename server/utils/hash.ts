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

/**
 * Add some HASH to item id , so we can confirm that id is valid with out checking is it exist in DB
 * plain text / number ID can be guessed or random submit id by user
*/
export class Security {
  static Hash( id: number | string , extraSalt?: string ){

   return `${id}---${MD5(id + ( process.env?.APP_SECRET || '' ) + ( extraSalt || '' ) )}`
  }

  static Verify( id: string , extraSalt?: string ){
   const [ realId , hashString ] = id.split('---')
   if( !realId || !hashString )return false
   
   if( Security.Hash(realId , extraSalt ) !== id )return false
   
   return realId
  }
}