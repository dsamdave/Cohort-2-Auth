

const pagination = (req)=> {

    const page = Number(req.query.page) || 1

    const limit = Number(req.query.limit) || 5

    const skip = limit * ( page - 1  )

    return { page, limit, skip }

}

module.exports = { pagination }