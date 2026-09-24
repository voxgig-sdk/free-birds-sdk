
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreeBirdsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreeBirdsSDK.test()
    equal(testsdk instanceof FreeBirdsSDK, true,
      'FreeBirdsSDK.test() must return a client synchronously')
  })

})
