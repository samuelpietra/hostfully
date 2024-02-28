import { CSSProperties } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import './AnimatedLoading.styles.css'

interface AnimatedLoadingProps extends CSSProperties {
  size?: number | string
}

function AnimatedLoading({ size, ...style }: AnimatedLoadingProps) {
  return (
    <AiOutlineLoading3Quarters
      color="#61afef"
      size={size}
      style={{
        animation: 'rotate 1s linear infinite',
        ...style
      }}
    />
  )
}

export type { AnimatedLoadingProps }
export { AnimatedLoading }
