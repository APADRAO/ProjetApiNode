import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "abrakadabra";

export const authRouter = express.Router();

authRouter.post("/login", (req: Request, res: Response) => {
  // Aqui você pode implementar a lógica de autenticação
  // Verifique as credenciais e, se forem válidas, gere um token JWT

  const { username, password } = req.body;

  // Exemplo de autenticação básica
  if (username === "admin" && password === "admin123") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});
