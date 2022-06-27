import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class PeopleController {
	async store(req: Request, res: Response) {
		const {
			name,
			email,
			birthday,
			gender,
			address,
			phone,
			marital_status,
			rg,
			cpf,
			church,
		} = req.body;

		const peopleExist = await prisma.people.findUnique({ where: { cpf } });

		if (peopleExist) {
			return res.json({ error: "Jovem já Cadastrado" });
		}

		const people = await prisma.people.create({
			data: {
				name,
				email,
				birthday,
				gender,
				address,
				phone,
				marital_status,
				rg,
				cpf,
				church,
			},
		});

		return res.json({ people });
	}

	async index(req: Request, res: Response) {
		const PeopleList = await prisma.people.findMany();

		return res.json({ PeopleList });
	}
}
