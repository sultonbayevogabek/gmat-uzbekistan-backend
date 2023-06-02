export default async (req, res) => {
   delete req.user.dataValues.password
   return res.status(200).send({
      ok: true,
      user: req.user
   })
}
