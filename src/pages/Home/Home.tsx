import { Layout } from '@/components/Layout'
import { StateMessage } from '@/components/StateMessage'
import usePageTitle from '@/hooks/usePageTitle'

function HomePage() {
  usePageTitle()

  // return <StateMessage type="empty" title="Hello World" subtitle="Nice to see you!" />

  return (
    <Layout.Sheet>
      <h1>Current bookings</h1>
    </Layout.Sheet>
  )
}

export default HomePage
