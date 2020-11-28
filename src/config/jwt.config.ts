// TODO: env var is not working
export const jwtConfig: { jwtSecret: string } = {
  jwtSecret: process.env.JWT_SECRET || 'mysecret',
};
