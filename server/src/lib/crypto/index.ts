import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

class CryptoHelper {
  private jwtSecret: string | null = null;
  private adminJwtSecret: string | null = null;
  private bcryptRound: number | null = null;

  public setup(props: {
    aesSecret?: string;
    jwtSecret?: string;
    adminJwtSecret?: string;
    bcryptRound?: number;
  }) {
    this.jwtSecret = props.jwtSecret || null;
    this.adminJwtSecret = props.adminJwtSecret || null;
    this.bcryptRound = props.bcryptRound || null;
  }

  public encodeJwt<T extends Object>(data: T, options?: jwt.SignOptions) {
    if (!this.jwtSecret)
      throw new Error('You should initiate crypto-helper with jwtSecret Property');
    const jwtToken = jwt.sign({ ...data }, this.jwtSecret, options);

    return jwtToken;
  }

  public verifyJwt<T>(token: string) {
    if (!this.jwtSecret)
      throw new Error('You should initiate crypto-helper with jwtSecret Property');
    try {
      let decoded = jwt.verify(token, this.jwtSecret);

      return decoded as T;
    } catch (err) {
      throw new Error(`유효하지 않거나 만료된 jwt 토큰입니다. token :${token}`);
    }
  }

  public bcryptHash(password: string): string {
    if (!this.bcryptRound)
      throw new Error('You should initiate crypto-helper with bcryptRound Property');
    const salt = bcrypt.genSaltSync(this.bcryptRound);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  public compareBcryptHash(plain: string, encoded: string): boolean {
    let isValid = bcrypt.compareSync(plain, encoded);

    return isValid;
  }

  public encodeAdminJwt<T extends Object>(data: T, options?: jwt.SignOptions) {
    if (!this.adminJwtSecret)
      throw new Error('You should initiate crypto-helper with adminJwtSecret Property');
    const jwtToken = jwt.sign({ ...data }, this.adminJwtSecret, options);

    return jwtToken;
  }
}

export const cryptoHelper = new CryptoHelper();
