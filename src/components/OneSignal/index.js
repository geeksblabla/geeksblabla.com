import React, { useState, useEffect } from "react"
import NotifIcon from "assets/notif.svg"

const isBrowser = typeof window !== "undefined"
const appId = "a9b27779-030a-49fc-bb8d-17f2f95bf48e"
// const appId = __DEV__
//   ? "d370450d-d7a8-4eca-9bf2-652fc0b83993"
//   : "a9b27779-030a-49fc-bb8d-17f2f95bf48e"

let OneSignalInitialized = false
const TimeToShowPopup = 60000

export const HiddenNotificationTrigger = () => <GetNotification hidden />

export const GetNotification = ({ hidden = false }) => {
  const [loading, setLoading] = useState(false)
  const [pushSupported, setPushSupported] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(
    (isBrowser && window.localStorage.getItem("push_subscribed")) === "true" ||
      false
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hidden && !isSubscribed) enablePushNotification()
    }, TimeToShowPopup)
    return () => clearTimeout(timer)
  }, [])

  useEffect(
    () =>
      isBrowser && window.localStorage.setItem("push_subscribed", isSubscribed),
    [isSubscribed]
  )
  const updateSubscription = async () => {
    try {
      const state = await window.OneSignal.getNotificationPermission()

      setIsSubscribed(state === "granted")
    } catch (error) {
      console.error("Error getting notification status", error)
    }
  }
  const enablePushNotification = () => {
    setLoading(true)
    loadOneSignalScript(() => {
      if (!window.OneSignal.isPushNotificationsSupported()) {
        setPushSupported(false)
        return
      }
      initOneSignal(() => {
        setTimeout(() => {
          setLoading(false)
        }, 3000)
        updateSubscription()
        window.OneSignal.on("subscriptionChange", updateSubscription)
      })
    })
  }
  if (hidden) return null
  if (isSubscribed)
    return (
      <span>
        Congrats,<br></br> You will Get Instant Updates
      </span>
    )

  return (
    <>
      {pushSupported && (
        <button className="button" onClick={enablePushNotification}>
          <NotifIcon width="20" /> {loading ? "loading..." : "Notify Me"}
        </button>
      )}
      {!pushSupported && (
        <span>
          ⚠️ <br></br>You Browser does not support Push Notification{" "}
        </span>
      )}
    </>
  )
}

const initOneSignal = callback => {
  if (isBrowser && !OneSignalInitialized) {
    window.OneSignal = window.OneSignal || []
    window.OneSignal.push(function() {
      window.OneSignal.init({
        appId,
      })
      OneSignalInitialized = true
      if (callback) callback()
    })
  } else {
    if (OneSignalInitialized & callback) callback()
  }
}

const loadOneSignalScript = callback => {
  const existingScript = document.getElementById("onSignal")
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = "https://cdn.onesignal.com/sdks/OneSignalSDK.js" // URL for the third-party library being loaded.
    script.id = "onSignal" // e.g., googleMaps or stripe
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) callback()
    }
  }

  if (existingScript && callback) callback()
}
