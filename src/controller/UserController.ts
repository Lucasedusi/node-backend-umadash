import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

import { v4 as uuidv4 } from "uuid";

export class UserController {
	async store(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const userExists = await prisma.user.findUnique({ where: { email } });

		if (userExists) {
			return res.json({ error: "User Exists" });
		}

		const hashPassword = await hash(password, 8);

		const user = await prisma.user.create({
			data: {
				id: uuidv4(),
				name,
				email,
				password: hashPassword,
			},
		});

		return res.json({ user });
	}

	async index(req: Request, res: Response) {
		const UserList = await prisma.user.findMany();

		return res.json({ UserList });
	}
}
