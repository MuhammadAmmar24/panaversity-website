import UpdatePasswordDialog from '@/src/components/auth/update-password/update-password-dialog'
import React, { Suspense } from 'react'

const verification = () => {
  return (
        <Suspense>
            <UpdatePasswordDialog />
        </Suspense>
  )
}

export default verification