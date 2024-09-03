'use client'

import { Card, CardContent } from "@/components/ui/card"

export function LandscapeCard() {
  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="flex justify-between items-center p-6 space-x-4">
        <div className="w-1/4">
          <img
            src="/placeholder.svg?height=200&width=200"
            alt="Left image"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold text-center">Main Heading</h1>
          <div className="bg-secondary p-4 rounded-lg w-full">
            <h2 className="text-xl font-semibold text-secondary-foreground text-center">Subheading in a Box</h2>
          </div>
        </div>
        <div className="w-1/4">
          <img
            src="/placeholder.svg?height=200&width=200"
            alt="Right image"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}