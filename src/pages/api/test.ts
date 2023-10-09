import { NextApiRequest, NextApiResponse } from "next/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ text: 'Hello ' + req.query.name });
}
