import Constants from 'expo-constants'
import { useCallback, useEffect, useState, useRef } from 'react'
import { AppState } from 'react-native'
import ReceiveSharingIntent from 'react-native-receive-sharing-intent'

export interface ShareIntent {
  mimeType: string
  data: string
  extraData?: object | undefined
}

export interface ShareData {
  mimeType: string
  data: string | string[]
  extraData?: object | undefined
}

export const useShareIntent = async () => {
  const appState = useRef(AppState.currentState)
  const [shareIntent, setShareIntent] = useState(null)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current === 'active' &&
        ['inactive', 'background'].includes(nextAppState)
      ) {
        console.log('useShareIntent[to-background] reset intent')
        setShareIntent(null)
        ReceiveSharingIntent?.clearReceivedFiles()
      }

      appState.current = nextAppState
    })
    return () => {
      subscription.remove()
    }
  }, [])

  useEffect(() => {
    console.log('useShareIntent[mount]', Constants.expoConfig.scheme)
    ReceiveSharingIntent.getReceivedFiles(
      // files returns as JSON Array example
      //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
      (data) => {
        console.log({ data })
        setShareIntent(JSON.stringify(data.text) || '')
        // const intent = data[0]
        // if (intent.weblink || intent.text) {
        //   const link = intent.weblink || intent.text || ''
        //   console.log('useShareIntent[text/url]', link)
        //   setShareIntent(JSON.stringify(link))
        // } else if (intent.filePath) {
        //   console.log('useShareIntent[file]', {
        //     uri: intent.contentUri || intent.filePath,
        //     mimeType: intent.mimeType,
        //     fileName: intent.fileName,
        //   })
        //   setShareIntent({
        //     uri: intent.contentUri || intent.filePath,
        //     mimeType: intent.mimeType,
        //     fileName: intent.fileName,
        //   })
        // } else {
        //   console.log('useShareIntent[mount] share type not handled', data)
        // }
      },
      (err) => {
        console.log('useShareIntent[mount] error', err)
      },
      //@ts-ignore
      Constants.expoConfig.scheme,
    )
    return () => {
      ReceiveSharingIntent?.clearReceivedFiles()
    }
  }, [shareIntent])

  return shareIntent
}
