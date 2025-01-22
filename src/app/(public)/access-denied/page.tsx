import Link from 'next/link'
import { XCircle } from 'lucide-react'
import { Button } from "@/src/components/ui/button"

export default function AccessDenied() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 pt-20 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 text-center">Access Denied</h1>
        <p className="mt-2 text-base text-gray-500 text-center">Sorry, you don't have permission to access this page.</p>
        <div className="mt-6 flex justify-center">
          <Link href="/">
            <Button className='bg-accent text-white hover:bg-emerald-500'>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}