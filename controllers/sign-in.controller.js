const SignInController = async (req, res) => {
    try {
        const { email, password } = req.body

        res.status(200).send({
            email, password
        })
    } catch (e) {
        res.status(400).send({
            ok: false,
            message: e + ''
        })
    }
}

export default SignInController