"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { checkBackendHealth } from "@/services/healthService"

const MAX_ATTEMPTS = 20
const RETRY_INTERVAL = 3000
const REQUEST_TIMEOUT = 15000

function wait(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, milliseconds)

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId)

        reject(
          new DOMException(
            "Operação cancelada",
            "AbortError"
          )
        )
      },
      {
        once: true,
      }
    )
  })
}

export function useBackendHealth() {
  const [status, setStatus] = useState("checking")
  const [attempt, setAttempt] = useState(1)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [retryCount, setRetryCount] = useState(0)

  const activeRequestRef = useRef(null)

  const retry = useCallback(() => {
    setRetryCount((currentValue) => currentValue + 1)
  }, [])

  useEffect(() => {
    const lifecycleController = new AbortController()

    let elapsedIntervalId

    async function initializeBackend() {
      setStatus("checking")
      setAttempt(1)
      setElapsedSeconds(0)

      elapsedIntervalId = setInterval(() => {
        setElapsedSeconds(
          (currentValue) => currentValue + 1
        )
      }, 1000)

      for (
        let currentAttempt = 1;
        currentAttempt <= MAX_ATTEMPTS;
        currentAttempt += 1
      ) {
        if (lifecycleController.signal.aborted) {
          return
        }

        setAttempt(currentAttempt)

        const requestController = new AbortController()

        activeRequestRef.current = requestController

        const requestTimeoutId = setTimeout(() => {
          requestController.abort()
        }, REQUEST_TIMEOUT)

        const abortCurrentRequest = () => {
          requestController.abort()
        }

        lifecycleController.signal.addEventListener(
          "abort",
          abortCurrentRequest,
          {
            once: true,
          }
        )

        try {
          await checkBackendHealth({
            signal: requestController.signal,
          })

          clearTimeout(requestTimeoutId)

          lifecycleController.signal.removeEventListener(
            "abort",
            abortCurrentRequest
          )

          if (!lifecycleController.signal.aborted) {
            setStatus("ready")
          }

          return
        } catch (error) {
          clearTimeout(requestTimeoutId)

          lifecycleController.signal.removeEventListener(
            "abort",
            abortCurrentRequest
          )

          if (lifecycleController.signal.aborted) {
            return
          }

          console.warn(
            `Health Check: tentativa ${currentAttempt} falhou.`,
            error
          )

          if (currentAttempt === MAX_ATTEMPTS) {
            setStatus("error")
            return
          }

          try {
            await wait(
              RETRY_INTERVAL,
              lifecycleController.signal
            )
          } catch (waitError) {
            if (waitError.name === "AbortError") {
              return
            }

            throw waitError
          }
        }
      }
    }

    initializeBackend().catch((error) => {
      if (
        !lifecycleController.signal.aborted
      ) {
        console.error(
          "Erro inesperado ao inicializar backend:",
          error
        )

        setStatus("error")
      }
    })

    return () => {
      lifecycleController.abort()
      activeRequestRef.current?.abort()

      if (elapsedIntervalId) {
        clearInterval(elapsedIntervalId)
      }
    }
  }, [retryCount])

  useEffect(() => {
    if (status !== "checking") {
      return
    }

    return () => {}
  }, [status])

  return {
    status,
    attempt,
    maxAttempts: MAX_ATTEMPTS,
    elapsedSeconds,
    retry,
  }
}