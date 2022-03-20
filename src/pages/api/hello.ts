import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  res.json({ hello: "World" });
};

export default handler;
