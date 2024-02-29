import dateFormat from '../dateFormat'

describe('dateFormat', () => {
  test('SHOULD format date', () => {
    expect(dateFormat.format('12/31/2024')).toBe('12/31/2024, 12:00 AM')
  })
})
