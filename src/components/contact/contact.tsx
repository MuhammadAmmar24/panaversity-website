"use client"
import { useState } from 'react'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"


export default function ContactUs() {
  const [formStatus, setFormStatus] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus("Thank you for your message. We'll get back to you soon!")
  }

  return (
    <div className="min-h-screen  bg-background">
 
     
      <div className="max-w-4xl mx-auto  mt-[5rem] px-4 sm:px-6 lg:px-8">
        <div className="bg-card shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 sm:p-10">
            <h2 className="text-3xl font-semibold mb-6 ">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required className="h-32" />
              </div>
              <Button type="submit" className="w-full text-center py-2 text-white rounded-md bg-accent hover:bg-[#18c781] font-medium">Send Message</Button>
            </form>
            {formStatus && (
              <p className="mt-4 text-green-600">{formStatus}</p>
            )}
          </div>
          
          <div className="bg-muted p-6 sm:p-10">
            <h2 className="text-2xl font-semibold mb-6 ">Contact Information</h2>
            <div className="space-y-4 ">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-primary mr-4" />
                <span>info@panaversity.org</span>
              </div>
              <div className="flex items-center ">
                <Phone className="w-5 h-5 text-primary mr-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary mr-4" />
                <span>Virtual Campus, Panaversity</span>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}