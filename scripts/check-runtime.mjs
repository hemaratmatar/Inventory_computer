const expectedNode = '24.21.0'
const expectedNpm = '11.19.0'
const currentNode = process.versions.node
const currentNpm = process.env.npm_config_user_agent?.match(/^npm\/([^ ]+)/)?.[1]

const errors = []

if (currentNode !== expectedNode) {
  errors.push(`Node.js ${expectedNode} is required (current: ${currentNode}).`)
}

if (currentNpm && currentNpm !== expectedNpm) {
  errors.push(`npm ${expectedNpm} is required (current: ${currentNpm}).`)
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  console.error(`Run \"nvm install ${expectedNode}\" and \"nvm use ${expectedNode}\", then run \"npm ci\".`)
  process.exit(1)
}
