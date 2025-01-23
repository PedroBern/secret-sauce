import { getSecretKey } from './crypto'

const publicKey = (function () {
  if (!process.env.PUBLICKEY) throw new Error('missing public key')
  return process.env.PUBLICKEY.split('-')
})()

const inputID = 'input'
const outputID = 'output'

document.getElementById(inputID)?.addEventListener('input', async () => {
  const output = document.getElementById(outputID) as HTMLParagraphElement
  const input = document.getElementById(inputID) as HTMLInputElement

  if (!input.value) {
    output.textContent = ''
    return
  }
  output.textContent = await getSecretKey(input.value, publicKey)
})
