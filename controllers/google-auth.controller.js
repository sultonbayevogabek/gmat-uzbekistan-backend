import { User } from '../models/models.js'
import { generateHash } from '../services/bcrypt.service.js'
import { generateToken } from '../services/jwt.service.js'
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client('532709345111-gv3sdg2incups7mkgqh503ksottj6iid.apps.googleusercontent.com');

export default async (req, res) => {
   const ticket = await client.verifyIdToken({
      idToken : req.body.idToken,
      audience : "532709345111-gv3sdg2incups7mkgqh503ksottj6iid.apps.googleusercontent.com"
   });
   res.status(200).send({
      ok: true,
      ticket
   })
}
