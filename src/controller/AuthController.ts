import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export class AuthController {
	async authenticate(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return res.json({ error: "User not found" });
		}

		const isValidPassword = await compare(password, user.password);

		if (!isValidPassword) {
			return res.json({ error: "Incorrect password" });
		}

		const token = sign({ id: user.id }, "dc53fc4f621c80bdc2fa0329a6123708", {
			expiresIn: "1d",
		});

		const { id } = user;

		return res.json({ user: { id, email }, token });
	}
}
