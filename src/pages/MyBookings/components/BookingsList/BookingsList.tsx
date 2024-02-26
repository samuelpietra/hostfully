import { FaPaperPlane, FaSuitcase } from 'react-icons/fa'
import { IoOpenOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { ListBookingsAPI } from '@/api-models/bookings'
import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'
import dateFormat from '@/infrastructure/dateFormat'

interface BookingsListProps {
  items: ListBookingsAPI.Item[]
}

function BookingsList({ items }: BookingsListProps) {
  const navigate = useNavigate()

  return (
    <>
      {items.map((item, index) => {
        const isLastIndex = index === items.length - 1

        return (
          <Card
            key={item.id}
            alignItems="center"
            background="#252931"
            flexDirection="row"
            justifyContent="space-between"
            marginBottom={isLastIndex ? undefined : 8}
          >
            <Column>
              <h3 style={{ marginBottom: 8 }}>{item.customerName}</h3>

              <Row alignItems="center">
                <FaSuitcase color="#98c379" size={12} />
                <h5 style={{ marginLeft: 8 }}>{dateFormat.format(item.checkInAt)}</h5>
              </Row>

              <Row alignItems="center">
                <FaPaperPlane color="#e06c75" size={12} />
                <h5 style={{ marginLeft: 8 }}>{dateFormat.format(item.checkOutAt)}</h5>
              </Row>
            </Column>

            <IoOpenOutline onClick={() => navigate(`${item.id}`)} size={36} />
          </Card>
        )
      })}
    </>
  )
}

export { BookingsList }
