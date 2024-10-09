import ResendLinkDialog from '@/src/components/auth/resend-link/resendLink-dialog'
import React, { Suspense } from 'react'

const page = () => {
  return (
        <Suspense>
            <ResendLinkDialog />
        </Suspense>
  )
}

export default page