import EmailVerificationPendingDialog from '@/src/components/auth/verify/pendingverification-dialog'
import React, { Suspense } from 'react'

const page = () => {
  return (
        <Suspense>
            <EmailVerificationPendingDialog />
        </Suspense>
  )
}

export default page