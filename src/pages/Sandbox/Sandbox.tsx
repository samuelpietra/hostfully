import { Layout } from '@/components/Layout'
import { Row } from '@/components/Row'
import usePageTitle from '@/hooks/usePageTitle'

function SandboxPage() {
  usePageTitle('Sandbox')

  return (
    <Layout.Sheet>
      <Row borderBottom="1px solid #444" justifyContent="center" marginBottom={32}>
        <h2 style={{ marginBottom: 8 }}>Sandbox</h2>
      </Row>
    </Layout.Sheet>
  )
}

export default SandboxPage
