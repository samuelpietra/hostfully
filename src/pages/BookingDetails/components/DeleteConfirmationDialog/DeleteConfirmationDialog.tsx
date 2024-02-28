import { useCallback } from 'react'

import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { DeleteBookingAPI } from '@/api-models/bookings'
import { Column } from '@/components/Column'
import { AnimatedLoading } from '@/components/LoadingContainer'
import useHttpStateful from '@/hooks/useHttpStateful'

interface DialogProps {
  bookingId: string
  onCancel: () => void
  onConfirm: () => void
  visible?: boolean
}

function DeleteConfirmationDialog({ bookingId, onCancel, onConfirm, visible = false }: DialogProps) {
  const { clearError, error, isLoading, request } = useHttpStateful<undefined, DeleteBookingAPI.RequestParams>(
    'delete',
    '/bookings/:id'
  )

  const handleDelete = useCallback(async () => {
    clearError()

    const { error } = await request({ urlParams: { id: bookingId } })

    if (!error) onConfirm()
  }, [bookingId, clearError, onConfirm, request])

  return (
    <Dialog open={visible}>
      <Column margin={8} width={320}>
        <DialogTitle>Delete booking?</DialogTitle>

        <DialogContent>
          <Alert severity={error ? 'error' : 'warning'} variant="outlined">
            {error ? error.detail : 'This action cannot be reversed.'}
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button sx={{ color: '#ccc', height: 32 }} onClick={onCancel}>
            Cancel
          </Button>

          <Button
            sx={{ height: 32 }}
            color="error"
            disabled={isLoading}
            onClick={() => void handleDelete()}
            variant="contained"
          >
            {isLoading && <AnimatedLoading marginRight={12} size={18} />}
            Delete
          </Button>
        </DialogActions>
      </Column>
    </Dialog>
  )
}

export { DeleteConfirmationDialog }
