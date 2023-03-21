import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    const note = await prisma.note.create({ data: { content } });
    res.status(201).json(note);
  } else if (req.method === 'GET') {
    const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json(notes);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
