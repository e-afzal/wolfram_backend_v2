import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mario",
    email: "mario@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Luigi",
    email: "luigi@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
