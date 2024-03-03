import { Controller } from 'react-hook-form'
import { IoCalendar, IoPersonSharp } from 'react-icons/io5'

import { TextField } from '@mui/material'

import { Card } from '@/components/Card'
import { Column } from '@/components/Column'
import { Row } from '@/components/Row'

import { FormProps } from '../../EditBooking.types'
import formRules from '../../formRules'

function MobileForm({ control, formState }: FormProps) {
  const { errors } = formState

  return (
    <Card background="#2d313b" flexDirection="column" marginBottom={20}>
      <Column marginBottom={36}>
        <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
          <IoPersonSharp color="#3dc299" size={22} />
          <h2 style={{ marginLeft: 16 }}>Customer</h2>
        </Row>

        <Controller
          name="customer.name"
          control={control}
          rules={{ ...formRules.required, ...formRules.onlyLetters }}
          render={({ field: { onChange, ...field } }) => (
            <Column marginBottom={16} width={272}>
              <TextField
                {...field}
                error={Boolean(errors.customer?.name?.message)}
                helperText={errors.customer?.name?.message}
                label="Name"
                fullWidth
                onChange={onChange}
                variant="standard"
              />
            </Column>
          )}
        />

        <Row>
          <Controller
            name="customer.document"
            control={control}
            rules={{ ...formRules.required }}
            render={({ field: { onChange, ...field } }) => (
              <Column marginRight={32} width={120}>
                <TextField
                  {...field}
                  error={Boolean(errors.customer?.document?.message)}
                  helperText={errors.customer?.document?.message}
                  label="Document"
                  fullWidth
                  onChange={onChange}
                  variant="standard"
                />
              </Column>
            )}
          />

          <Controller
            name="customer.phone"
            control={control}
            rules={{ ...formRules.required, ...formRules.noLetters }}
            render={({ field: { onChange, ...field } }) => (
              <Column width={120}>
                <TextField
                  {...field}
                  error={Boolean(errors.customer?.phone?.message)}
                  helperText={errors.customer?.phone?.message}
                  label="Phone"
                  fullWidth
                  onChange={onChange}
                  variant="standard"
                />
              </Column>
            )}
          />
        </Row>
      </Column>

      <Column>
        <Row alignItems="center" borderBottom="1px dashed #555" marginBottom={24} paddingBottom={8}>
          <IoCalendar color="#3dc299" size={22} />
          <h2 style={{ marginLeft: 16 }}>Period</h2>
        </Row>

        <Controller
          name="checkInAt"
          control={control}
          rules={{ ...formRules.required }}
          render={({ field: { onChange, ...field } }) => (
            <Column marginBottom={16} width={272}>
              <TextField
                {...field}
                error={Boolean(errors.checkInAt?.message)}
                helperText={errors.checkInAt?.message}
                label="Check-in"
                fullWidth
                onChange={onChange}
                placeholder="MM/DD/YYYY hh:mm AM/PM"
                variant="standard"
              />
            </Column>
          )}
        />

        <Controller
          name="checkOutAt"
          control={control}
          rules={{ ...formRules.required }}
          render={({ field: { onChange, ...field } }) => (
            <Column width={272}>
              <TextField
                {...field}
                error={Boolean(errors.checkOutAt?.message)}
                helperText={errors.checkOutAt?.message}
                label="Check-out"
                fullWidth
                onChange={onChange}
                placeholder="MM/DD/YYYY hh:mm AM/PM"
                variant="standard"
              />
            </Column>
          )}
        />
      </Column>
    </Card>
  )
}

export { MobileForm }
