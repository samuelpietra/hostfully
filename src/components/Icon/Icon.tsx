import { SvgIcon } from '@mui/material'

import * as SvgIcons from './SvgIcons'
import SvgIconProps from './SvgIcons/SvgIcons.types'

type IconsType = keyof typeof SvgIcons

interface IconProps extends SvgIconProps {
  name: IconsType
  size?: number | string
}

function Icon({ name, size = 32, ...colorProps }: IconProps) {
  if (!SvgIcons[name]) throw new Error(`Icon with name: ${name} not found!`)

  const Component = SvgIcons[name]

  return (
    <SvgIcon sx={{ fontSize: size }} titleAccess={name}>
      <Component {...colorProps} />
    </SvgIcon>
  )
}

export { Icon }
