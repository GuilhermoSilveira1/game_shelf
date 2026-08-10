"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { checkBackendHealth } from "@/services/healthService"

const MAX_ATTEMPTS = 20
const RETRY_INTERVAL = 5000

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export function useBackendHealth() {
  const [status, setStatus] = useState("checking")
  const [attempt, setAttempt] = useState(1)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const runningRef = useRef(false)
  const mountedRef = useRef(true)

  const checkHealth = useCallback(async () => {
    if (runningRef.current) {
      return
    }

    runningRef.current = true

    setStatus("checking")
    setAttempt(1)
    setElapsedSeconds(0)

    for (
      let currentAttempt = 1;
      currentAttempt <= MAX_ATTEMPTS;
      currentAttempt += 1
    ) {
      if (!mountedRef.current) {
        runningRef.current = false
        return
      }

      setAttempt(currentAttempt)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
      }, 10000)

      try {
        await checkBackendHealth({
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (mountedRef.current) {
          setStatus("ready")
        }

        runningRef.current = false
        return
      } catch {
        clearTimeout(timeoutId)

        if (currentAttempt === MAX_ATTEMPTS) {
          if (mountedRef.current) {
            setStatus("error")
          }

          runningRef.current = false
          return
        }

        await wait(RETRY_INTERVAL)
      }
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true
    checkHealth()

    return () => {
      mountedRef.current = false
      runningRef.current = false
    }
  }, [checkHealth])

  useEffect(() => {
    if (status !== "checking") {
      return
    }

    const intervalId = setInterval(() => {
      setElapsedSeconds((currentValue) => currentValue + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [status])

  return {
    status,
    attempt,
    maxAttempts: MAX_ATTEMPTS,
    elapsedSeconds,
    retry: checkHealth,
  }
}