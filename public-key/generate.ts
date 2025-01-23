import * as fs from 'fs'

import * as dotenv from 'dotenv'
import { generatePublicKey } from './crypto'

dotenv.config({
  path: './.env.script',
})

async function main() {
  fs.writeFileSync(
    './.env',
    `PUBLICKEY=${await generatePublicKey({
      password: process.env.PASSWORD || '',
      secretKey: process.env.SECRETKEY || '',
    })}`
  )
}
main()
