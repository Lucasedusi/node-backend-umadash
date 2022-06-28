import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class UserController {
	async store(req: Request, res: Response) {
		const { id, name, email, password } = req.body;

		const userExists = await prisma.user.findUnique({ where: { email } });

		if (userExists) {
			return res.json({ error: "User Exists" });
		}

		const hashPassword = await hash(password, 8);

		const user = await prisma.user.create({
			data: {
				id,
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

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const { name, email, password } = req.body;

		const hashPassword = await hash(password, 8);

		const user = await prisma.user.update({
			where: { id: String(id) },
			data: { name: name, email: email, password: hashPassword },
		});

		return res.status(200).json({ user });
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const user = await prisma.user.delete({ where: { id: String(id) } });

		return res.status(204).json({ user });
	}
}
