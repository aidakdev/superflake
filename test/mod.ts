import Superflake from '../'

const testGenReturnsString = () => {
    let flake = new Superflake({ nodeId: 1 }).gen()
    let output = typeof flake === 'string'
        ? 'testGenReturnsString: ok'
        : 'testGenReturnsString: fail'

    console.log(output)
}

const testGenReturnsBigint = () => {
    let flake = new Superflake({ nodeId: 1 }).gen(true)
    let output = typeof flake === 'bigint'
        ? 'testGenReturnsBigint: ok'
        : 'testGenReturnsBigint: fail'

    console.log(output)
}

const tests = [testGenReturnsString, testGenReturnsBigint]

for (const test of tests) { test() }