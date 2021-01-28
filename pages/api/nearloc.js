import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  if(req.body.points_num && req.body.lng && req.body.lat){
    const { db } = await connectToDatabase();
    const neargeo = await db
      .collection("stations")
      .find({
        coordinates: {
          $near: { $geometry: { type: "Point", coordinates: [req.body.lng, req.body.lat] } },
        },
      })
      .limit(req.body.points_num)
      .toArray();
  
    res.statusCode = 200;
    res.json(neargeo);
    // res.json(JSON.parse(JSON.stringify(neargeo.data)));

  }else{
    res.status(400).send({ error: 'failed!' })
  }

};
