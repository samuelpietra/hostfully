import styled from 'styled-components/native'
import { layout, space, SpaceProps, LayoutProps } from 'styled-system'
import Svg, { SvgProps } from 'react-native-svg'
import { theme } from '../../theme'

export type SvgIconProps = SvgProps &
  LayoutProps<typeof theme> &
  SpaceProps<typeof theme>

export const SvgIcon = styled(Svg)<SvgIconProps>`
  ${layout}
  ${space}
`
