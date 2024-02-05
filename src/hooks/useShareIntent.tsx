import Constants from 'expo-constants'
import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'
import ReceiveSharingIntent from 'react-native-receive-sharing-intent'

export const getShareIntentAsync = async () => {
  return new Promise((resolve, reject) => {
    ReceiveSharingIntent.getReceivedFiles(
      (data) => {
        console.log({ data })
        if (!data || data.length === 0) {
          console.log('useShareIntent[data] no share intent detected')
          return
        }
        const intent = data[0]
        if (intent.weblink || intent.text) {
          const link = intent.weblink || intent.text || ''
          console.debug('useShareIntent[text/url]', link)
          resolve({ text: JSON.stringify(link) })
        } else if (intent.filePath) {
          console.debug('useShareIntent[file]', {
            uri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          })
          resolve({
            uri: intent.contentUri || intent.filePath,
            mimeType: intent.mimeType,
            fileName: intent.fileName,
          })
        } else {
          console.warn('useShareIntent[get] share type not handled', data)
          reject(new Error('TYPE_NOT_HANDLED'))
        }
      },
      (err) => {
        console.error('useShareIntent[get] internal native module error', err)
        reject(err)
      },
      // @ts-ignore
      Constants.expoConfig.scheme,
    )
  })
}

export const clearShareIntent = () => {
  ReceiveSharingIntent?.clearReceivedFiles()
}

export default function useShareIntent() {
  const appState = useRef(AppState.currentState)
  const [shareIntent, setShareIntent] = useState(null)
  const [error, setError] = useState()

  const refreshShareIntent = () =>
    getShareIntentAsync()
      .then(setShareIntent)
      // @ts-ignore
      .catch((err) => setError('shareIntent error : ' + err?.message))

  console.log({ appState })
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        console.debug('useShareIntent[active] refresh intent')
        refreshShareIntent()
      } else if (
        appState.current === 'active' &&
        ['inactive', 'background'].includes(nextAppState)
      ) {
        console.debug('useShareIntent[to-background] reset intent')
        setShareIntent(null)
        clearShareIntent()
      }

      appState.current = nextAppState
    })
    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    // console.debug('useShareIntent[mount]', Constants.expoConfig.scheme)
    refreshShareIntent()
    return clearShareIntent
  }, [])

  return {
    shareIntent,
    resetShareIntent: () => setShareIntent(null),
    error,
  }
}
