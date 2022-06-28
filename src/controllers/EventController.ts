import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class EventController {
	async store(req: Request, res: Response) {
		try {
			const { title, category, event_date } = req.body;

			const event = await prisma.event.create({
				data: {
					title,
					category,
					event_date,
				},
			});

			return res.status(201).json({ event });
		} catch (error) {
			return res.json({ error: "Server Error" });
		}
	}

	async index(req: Request, res: Response) {
		const listEvents = await prisma.event.findMany();

		return res.json({ listEvents });
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { title, category, event_date } = req.body;

			const event = await prisma.event.update({
				where: { id: String(id) },
				data: { title: title, category: category, event_date: event_date },
			});

			return res.status(200).json({ event });
		} catch (error) {
			return res.json({ error: "User not Found" });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;

			const event = await prisma.event.delete({ where: { id: String(id) } });

			return res.status(204).json({ event });
		} catch (error) {
			return res.json({ error: "User not Found" });
		}
	}
}
