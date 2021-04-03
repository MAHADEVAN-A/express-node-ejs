function mustBeInteger(req, res, next) {
    const id = req.params.id

    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

function checkContent(req, res, next) {
    const {content} = req.body

    if (content) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

function checkContact(req, res, next) {
    const {address,email,phno} = req.body

    if (address && email && phno) {
        next()
    } else {
        res.status(400).json({ message: 'fields are not good' })
    }
}

module.exports = {
    mustBeInteger,
    checkContent,
    checkContact
}