import * as crypto from 'crypto'

async function getPasswordHashHex(message: string) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = crypto.createHash('sha256').update(msgUint8).digest()
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0'))
  return hashHex
}

function getHexadecimalPairs() {
  const hexChars = '0123456789abcdef'
  const pairs = []

  for (let i = 0; i < hexChars.length; i++) {
    for (let j = 0; j < hexChars.length; j++) {
      // @ts-ignore
      pairs.push(hexChars[i] + hexChars[j])
    }
  }

  return pairs
}

export async function generatePublicKey({
  password,
  secretKey: originalSecretKey,
  secretKeyCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
}: {
  password: string
  secretKey: string
  secretKeyCharacters?: string
}) {
  const secretKey = originalSecretKey.split('-').slice(1).join('')
  if (!password) throw new Error('Missing password')
  if (!secretKey) throw new Error('Missing secretKey')

  const hashHex = await getPasswordHashHex(password)

  if (secretKey.length !== hashHex.length) {
    throw new Error(`Invalid secret key length.`)
  }

  if (secretKey.split('').some((c) => !secretKeyCharacters.includes(c))) {
    throw new Error(
      `Invalid secret key characters. Valid characters: "${secretKeyCharacters}".`
    )
  }

  const possibleHexPairs = getHexadecimalPairs()
  const charset = secretKeyCharacters.split('')

  let publicKey: string[][] = []

  for (let i = 0; i < hashHex.length; i++) {
    publicKey.push([])
    for (let j = 0; j < possibleHexPairs.length; j++) {
      if (possibleHexPairs[j] === hashHex[i]) {
        publicKey[i].push(secretKey[i])
      } else {
        publicKey[i].push(charset[Math.floor(Math.random() * charset.length)])
      }
    }
  }

  return publicKey.map((p) => p.join('')).join('-')
}
