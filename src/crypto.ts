async function getPasswordHashHex(message: string) {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0'))
  return hashHex
}

const hexadecimalPairs = (function () {
  const hexChars = '0123456789abcdef'
  const pairs = []

  for (let i = 0; i < hexChars.length; i++) {
    for (let j = 0; j < hexChars.length; j++) {
      pairs.push(hexChars[i] + hexChars[j])
    }
  }

  return pairs
})()

function formatSecretKey(key: string) {
  return [
    'A3',
    key.slice(0, 6),
    key.slice(6, 12),
    key.slice(12, 17),
    key.slice(17, 22),
    key.slice(22, 27),
    key.slice(27, 33),
  ].join('-')
}

export async function getSecretKey(password: string, publicKey: string[]) {
  const hashHex = await getPasswordHashHex(password)
  return formatSecretKey(
    hashHex
      .map((pair) => hexadecimalPairs.indexOf(pair))
      .map((column, row) => publicKey[row][column])
      .join('')
  )
}
