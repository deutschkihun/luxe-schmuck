import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
dotenv.config()

const users = [
  {
    firstname: 'Admin',
    lastname: 'User',
    email: 'admin@luxeschmuck.com',
    password: bcrypt.hashSync(process.env.ADMIN_PW, 10),
    isAdmin: true,
  },
];

export default users;
