import React from 'react'
import { renderWithTheme } from '../../../test.utils'

import { IconsType, iconsNames, Icon } from '../Icon'

describe('Icon', () => {
  test.each<IconsType>(iconsNames as IconsType[])(
    'THEN Icon SHOULD match with snapshot with name: %p',
    (name) => {
      expect(renderWithTheme(<Icon name={name} />).toJSON()).toMatchSnapshot()
    },
  )

  test('WHEN try to render Icon with a no existing name SHOULD throw an Error', () => {
    try {
      renderWithTheme(<Icon name={'unknown' as IconsType} />)
    } catch (e) {
      expect(e.message).toBe('Icon with name: unknown not exists!')
    }
  })
})
