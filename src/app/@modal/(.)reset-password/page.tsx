import ResetPasswordDialog from '@/src/components/auth/reset-password/reset-password-dialog'
import React, { Suspense } from 'react'

const verification = () => {
  return (
        <Suspense>
            <ResetPasswordDialog />
        </Suspense>
  )
}

export default verification