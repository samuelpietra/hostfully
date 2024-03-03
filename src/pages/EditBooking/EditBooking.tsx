import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaChevronLeft, FaSave } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { Alert, Button } from '@mui/material'

import { CreateBookingAPI, UpdateBookingAPI } from '@/api-models/bookings'
import { Layout } from '@/components/Layout'
import { AnimatedLoading } from '@/components/LoadingContainer'
import useHttpStateful from '@/hooks/useHttpStateful'
import usePageTitle from '@/hooks/usePageTitle'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { useBookingsStore } from '@/store/bookings'

import { MobileForm } from './components/MobileForm'
import { WebForm } from './components/WebForm'
import { FormValues } from './EditBooking.types'

const EMPTY_FORM: FormValues = {
  checkInAt: '',
  checkOutAt: '',
  customer: {
    document: '',
    name: '',
    phone: ''
  }
}

function EditBookingPage() {
  const { id: existingId = '' } = useParams<{ id: string }>()

  const pageTitle = useMemo(() => `${existingId ? 'Edit' : 'New'} booking`, [existingId])

  usePageTitle(pageTitle)

  const { storedDetails } = useBookingsStore()
  const [defaultValues] = useState<FormValues>(existingId && storedDetails ? storedDetails : EMPTY_FORM)

  const {
    clearError: clearCreateError,
    isLoading: isCreatingBooking,
    request: createBooking,
    error: createBookingError
  } = useHttpStateful<CreateBookingAPI.GetResponse, CreateBookingAPI.RequestParams>('post', '/bookings')

  const {
    clearError: clearUpdateError,
    isLoading: isUpdatingBooking,
    request: updateBooking,
    error: updateBookingError
  } = useHttpStateful<undefined, UpdateBookingAPI.RequestParams>('put', '/bookings/:id')

  const { control, formState, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues
  })

  const navigate = useNavigate()
  const dimensions = useWindowDimensions()

  const handleCreate = useCallback(
    async (data: FormValues) => {
      clearCreateError()

      const now = new Date().toISOString()

      const { error, payload } = await createBooking({
        body: {
          ...data,
          createdAt: now,
          updatedAt: now
        }
      })

      if (error) return

      reset(data)
      navigate(payload?.id ? `/${payload.id}` : '/')
    },
    [clearCreateError, createBooking, navigate, reset]
  )

  const handleUpdate = useCallback(
    async (data: FormValues) => {
      clearUpdateError()

      const now = new Date().toISOString()

      const { error } = await updateBooking({
        body: {
          ...data,
          updatedAt: now
        }
      })

      if (error) return

      reset(data)
      navigate(`/${existingId}?refresh=true`)
    },
    [clearUpdateError, existingId, navigate, reset, updateBooking]
  )

  const onSaveBooking = useCallback(
    (data: FormValues) => {
      if (existingId) return handleUpdate(data)

      return handleCreate(data)
    },
    [existingId, handleCreate, handleUpdate]
  )

  const Wrapper = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? Layout.Screen : Layout.Sheet), [dimensions])
  const Component = useMemo(() => (dimensions.width < Layout.MIN_WIDTH ? MobileForm : WebForm), [dimensions])

  const error = Boolean(createBookingError || updateBookingError)
  const isLoading = isCreatingBooking || isUpdatingBooking
  const creatingFormError = !existingId && !formState.isValid
  const editingFormError = Boolean(existingId) && (!formState.isValid || !formState.isDirty)

  return (
    <Wrapper>
      <h1 style={{ marginBottom: 24 }}>{pageTitle}</h1>

      {error && (
        <Alert severity="error" variant="outlined">
          {existingId ? updateBookingError?.detail : createBookingError?.detail}
        </Alert>
      )}

      <Layout.Content>
        <Component control={control} formState={formState} />
      </Layout.Content>

      <Layout.Footer justifyContent="space-between">
        <Button onClick={() => navigate(-1)} size="small" startIcon={<FaChevronLeft color="#3dc299" size={18} />}>
          Back
        </Button>

        <Button
          disabled={isLoading || creatingFormError || editingFormError}
          onClick={(event) => void handleSubmit(onSaveBooking)(event)}
          size="small"
          startIcon={isLoading ? <AnimatedLoading size={18} /> : <FaSave color="#3dc299" size={18} />}
        >
          Save
        </Button>
      </Layout.Footer>
    </Wrapper>
  )
}

export default EditBookingPage
