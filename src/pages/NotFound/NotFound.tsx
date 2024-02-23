import { useNavigate } from 'react-router-dom'

import { StateMessage } from '@/components/StateMessage'
import usePageTitle from '@/hooks/usePageTitle'

function NotFoundPage() {
  usePageTitle('Not Found')

  const navigate = useNavigate()

  return (
    <StateMessage
      type="error"
      title="404 - Not Found"
      subtitle="Make sure page exists."
      buttonAction={() => navigate('/')}
      buttonLabel="Back to home"
    />
  )
}

export default NotFoundPage
