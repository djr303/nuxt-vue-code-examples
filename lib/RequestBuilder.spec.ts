import RequestBuilder from './RequestBuilder'

describe('RequestBuilder.ts', () => {
  test('should return a new instance of the RequestBuilder class', () => {
    const req = new RequestBuilder()
    expect(req.constructor.name).toBe('RequestBuilder')
  })
})