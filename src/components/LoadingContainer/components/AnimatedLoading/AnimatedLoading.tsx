import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import './AnimatedLoading.styles.css'

interface AnimatedLoadingProps {
  size?: number | string
}

function AnimatedLoading({ size }: AnimatedLoadingProps) {
  return (
    <AiOutlineLoading3Quarters
      color="#61afef"
      size={size}
      style={{
        animation: 'rotate 1s linear infinite'
      }}
    />
  )
}

export type { AnimatedLoadingProps }
export { AnimatedLoading }
