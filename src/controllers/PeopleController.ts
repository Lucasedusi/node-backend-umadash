import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class PeopleController {
	async store(req: Request, res: Response) {
		try {
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

			return res.status(201).json({ people });
		} catch (error) {
			return res.json({ error: "Error" });
		}
	}

	async index(req: Request, res: Response) {
		const PeopleList = await prisma.people.findMany({});

		return res.json({ PeopleList });
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
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

			const people = await prisma.people.update({
				where: { id: String(id) },
				data: {
					name: name,
					email: email,
					birthday: birthday,
					gender: gender,
					address: address,
					phone: phone,
					marital_status: marital_status,
					rg: rg,
					cpf: cpf,
					church: church,
				},
			});

			return res.status(200).json({ people });
		} catch (error) {
			return res.json({ error: "User not found" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const people = await prisma.people.delete({
				where: { id: String(id) },
			});

			return res.status(204).json({ people });
		} catch (error) {
			return res.json({ error: "User not found" });
		}
	}
}
