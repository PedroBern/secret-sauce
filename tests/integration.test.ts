import { test, expect, describe } from 'vitest'
import { getSecretKey } from '../src/crypto'
import { generatePublicKey } from '../public-key/crypto'

describe('Should produce the same secret key using Node crypto and browser crypto', () => {
  test.each([
    {
      secretKey: 'A3-ABCDEF-GHIJKL-MNOPQ-RSTUV-WXYZ0-12345',
      password: 'password',
    },
    {
      secretKey: 'A3-AAAAAA-BBBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
      password: 'Secret-Password123',
    },
    {
      secretKey: 'A3-AAAAAA-BBBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
      password: 'password',
    },
  ])(
    'Password $password should be encoded into secret key $secretKey',
    async ({ secretKey, password }) => {
      const nodePublicKey = await generatePublicKey({
        password,
        secretKey,
      })

      const browserSecretKey = await getSecretKey(
        password,
        nodePublicKey.split('-')
      )

      expect(browserSecretKey).toBe(secretKey)
    }
  )
})
