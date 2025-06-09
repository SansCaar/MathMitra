"use client"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog"
import { Alert, AlertDescription } from "@components/ui/alert"
import { Plus, CheckCircle, AlertCircle } from "lucide-react"

export function JoinClassDialog() {
  const [joinClassCode, setJoinClassCode] = useState("")
  const [isJoining, setIsJoining] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleJoinClass = async () => {
    if (!joinClassCode.trim()) return

    setIsJoining(true)
    setStatus({ type: null, message: "" })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation - check if class code exists
      const validCodes = ["24640", "35821", "41796", "52947", "68394"]
      const isValid = validCodes.includes(joinClassCode.trim())

      if (isValid) {
        setStatus({
          type: "success",
          message: `Successfully joined class with code ${joinClassCode}!`,
        })
        setJoinClassCode("")
      } else {
        setStatus({
          type: "error",
          message: "Class code not found. Please check and try again.",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to join class. Please try again.",
      })
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-success hover:bg-green-600 text-black font-semibold rounded-xl h-12">
          <Plus className="w-5 h-5 mr-2 text-black" />
          Join Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join a Class</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {status.type && (
            <Alert
              className={`border-2 ${status.type === "success" ? "border-success bg-green-50" : "border-red-400 bg-red-50"}`}
            >
              {status.type === "success" ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <AlertDescription
                className={`text-base font-medium ${status.type === "success" ? "text-green-800" : "text-red-800"}`}
              >
                {status.message}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="class-code" className="text-base font-semibold">
              Class Code
            </Label>
            <Input
              id="class-code"
              placeholder="Enter 5-digit class code"
              value={joinClassCode}
              onChange={(e) => setJoinClassCode(e.target.value)}
              className="h-12 text-base border-2 rounded-xl"
              maxLength={5}
            />
            <p className="text-sm text-gray-500">Try: 24640, 35821, 41796, 52947, or 68394</p>
          </div>
          <Button
            onClick={handleJoinClass}
            disabled={!joinClassCode.trim() || isJoining}
            className="w-full h-12 bg-success hover:bg-green-600 text-white font-semibold rounded-xl"
          >
            {isJoining ? (
              <>
                <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Joining...
              </>
            ) : (
              "Join Class"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
