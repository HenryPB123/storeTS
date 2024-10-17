import { Request, Response } from "express";
import User from "../models/Users";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Mutex } from "async-mutex"; //libreria para manejar concurrencia con lock

// crea un mutex para asegurar que las operaciones sensibles no colisionen
const userCreationMutex = new Mutex();

export const register = async (req: Request, res: Response) => {
  const release = await userCreationMutex.acquire(); //adquirir el lock
  try {
    const { id, name, lastname, username, email, password, isAdmin } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      res.status(400).json({ message: "User already exists!!" });

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await User.create({
      id,
      name,
      lastname,
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });

    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "100d" }
    );

    res.status(201).json({ message: "User created", token });
  } catch (error) {
    console.log(error);
  } finally {
    release();
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      res
        .status(400)
        .json({ message: "Wrong credentials, user does not exist!!" });
    if (user) {
      const isPasswordValid = await bycrypt.compare(password, user.password);
      if (isPasswordValid)
        res.status(400).json({ message: "Wrong password!!" });
      const token = await jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "5h" }
      );
      res.status(200).json({ message: "Success Loguing!!!", token });
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    console.log(error);
  }
};
