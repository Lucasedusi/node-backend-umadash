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
}
