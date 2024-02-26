import { Column } from '../Column'
import { Container } from '../Container'
import { AnimatedLoading, AnimatedLoadingProps } from './components/AnimatedLoading'

interface LoadingContainerProps extends AnimatedLoadingProps {
  title?: string
}

function LoadingContainer({ size = 32, title }: LoadingContainerProps) {
  return (
    <Container testID="loading-container">
      <Column alignItems="center">
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
      </Column>
    </Container>
  )
}

export { LoadingContainer }
