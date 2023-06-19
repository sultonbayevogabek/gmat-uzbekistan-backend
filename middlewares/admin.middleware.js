export default async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).send({
            ok: false,
            error: `This user is not admin`
        });
    }

    next();
}
