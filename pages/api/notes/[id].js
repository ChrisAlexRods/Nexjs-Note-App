import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    await prisma.note.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
  } else if (req.method === "PUT") {
    const { content } = req.body;
    const updatedNote = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { content },
    });
    res.status(200).json(updatedNote);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
