import { Control, FormState } from 'react-hook-form'

interface FormValues {
  customer: {
    document: string
    name: string
    phone: string
  }
  checkInAt: string
  checkOutAt: string
}

interface FormProps {
  control: Control<FormValues, unknown>
  formState: FormState<FormValues>
}

export type { FormProps, FormValues }
