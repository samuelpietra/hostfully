import { Container } from '../Container'
import { AnimatedLoading, AnimatedLoadingProps } from './components/AnimatedLoading'

interface LoadingContainerProps extends AnimatedLoadingProps {
  title?: string
}

function LoadingContainer({ size = 32, title }: LoadingContainerProps) {
  return (
    <Container justifyContent="center" testID="loading-container">
      <AnimatedLoading size={size} />
      {Boolean(title) && (
        <h1
          style={{
            color: '#fff',
            marginTop: 8,
            textAlign: 'center'
          }}
        >
          {title}
        </h1>
      )}
    </Container>
  )
}

export { LoadingContainer }
