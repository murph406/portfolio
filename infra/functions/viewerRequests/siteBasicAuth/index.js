'use strict'

const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm')

const ssm = new SSMClient({ region: 'us-east-1' })
const PARAM = '/portfolio/develop/basic-auth' // value: "Basic <base64 user:pass>"

let expected // cached across warm invocations

function deny() {
    return {
        status: '401',
        statusDescription: 'Unauthorized',
        headers: {
            'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic realm="develop"' }],
        },
    }
}

exports.handler = async (event) => {
    const request = event.Records[0].cf.request
    const auth = request.headers.authorization

    try {
        if (!expected) {
            const res = await ssm.send(new GetParameterCommand({ Name: PARAM, WithDecryption: true }))
            expected = res.Parameter.Value
        }
    } catch (err) {
        console.error(err)
        return deny()
    }

    if (!auth || auth[0].value !== expected) return deny()
    return request
}