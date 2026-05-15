
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeBirdsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreeBirdsSDK.test()
    equal(null !== testsdk, true)
  })

})
