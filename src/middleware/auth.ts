import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayloadProps {
	id: string;
	iat: number;
	exp: string;
}

export function AuthMiddlewares(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: "Unauthenticated User" });
	}

	const [, token] = authorization.split(" ");

	try {
		const decoded = verify(token, "dc53fc4f621c80bdc2fa0329a6123708");

		const { id } = decoded as unknown as TokenPayloadProps;
		req.userId = id;

		next();
	} catch (error) {
		return res.status(401).json({ error: "Token Invalid" });
	}
}
