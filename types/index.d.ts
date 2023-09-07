declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    DB_PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_HOST: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
