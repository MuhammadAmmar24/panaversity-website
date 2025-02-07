'use server'

import { z } from 'zod'
import { ContactSchema } from '@/src/lib/schemas/contactSchema'

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL

export async function submitContactForm(data: z.infer<typeof ContactSchema>) {

  try {
    const validationResult = ContactSchema.safeParse(data)
    if (!validationResult.success) {
        return {
            type: "error",
            message: validationResult.error.errors
              .map((err) => err.message)
              .join(", "),
          };
      }

    const response = await fetch(GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validationResult.data),
    })

    if (!response.ok) {
      throw new Error('Failed to submit your response. Please try again!')
    }

    const result = await response.json()
    
    if (result.status !== 'success') {
      throw new Error('Failed to submit your response. Please try again!')
    }

    return { type: "success", message: 'Form submitted successfully' }
  } catch (error:any) {
    console.error('Server Action Error:', error)
    return { type: "error", message: error.message }
  }
}