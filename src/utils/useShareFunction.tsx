// import { Flex, Text, View, Image, VStack, useToast, Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { AppRegistry, Text, View, Image, Button } from 'react-native'
import ShareMenu, { ShareMenuReactView } from 'react-native-share-menu'

// share function
type SharedItem = {
  mimeType: string
  data: string
  extraData: any
}

interface ShareFunctionProps {}
export const useShareFunction = ({}: ShareFunctionProps) => {
  const [sharedData, setSharedData] = React.useState(null)
  const [sharedMimeType, setSharedMimeType] = React.useState(null)

  const handleShare = React.useCallback((item: SharedItem) => {
    if (!item) {
      return
    }

    const { mimeType, data, extraData } = item

    setSharedData(data)
    setSharedMimeType(mimeType)
    // You can receive extra data from your custom Share View
    console.log(extraData)
  }, [])

  React.useEffect(() => {
    ShareMenu.getInitialShare(handleShare)
  }, [])

  React.useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare)

    return () => {
      listener.remove()
    }
  }, [])

  if (!sharedMimeType && !sharedData) {
    // The user hasn't shared anything yet
    return null
  }
  if (sharedMimeType === 'text/plain') {
    // The user shared text
    return <Text>Shared text: {sharedData}</Text>
  }

  if (sharedMimeType.startsWith('image/')) {
    // The user shared an image
    return (
      <View>
        <Text>Shared image:</Text>
        <Image source={{ uri: sharedData }} />
      </View>
    )
  }

  // The user shared a file in general
  return (
    <View>
      <Text>Shared mime type: {sharedMimeType}</Text>
      <Text>Shared file location: {sharedData}</Text>
    </View>
  )
}

const Share = () => {
  const [sharedData, setSharedData] = useState('')
  const [sharedMimeType, setSharedMimeType] = useState('')

  useEffect(() => {
    ShareMenuReactView.data().then(({ mimeType, data }) => {
      setSharedData(data)
      setSharedMimeType(mimeType)
    })
  }, [])

  return (
    <View>
      <Button
        title="Dismiss"
        onPress={() => {
          ShareMenuReactView.dismissExtension()
        }}
      />
      <Button
        title="Send"
        onPress={() => {
          // Share something before dismissing
          ShareMenuReactView.dismissExtension()
        }}
      />
      <Button
        title="Dismiss with Error"
        onPress={() => {
          ShareMenuReactView.dismissExtension('Something went wrong!')
        }}
      />
      <Button
        title="Continue In App"
        onPress={() => {
          ShareMenuReactView.continueInApp()
        }}
      />
      <Button
        title="Continue In App With Extra Data"
        onPress={() => {
          ShareMenuReactView.continueInApp({ hello: 'from the other side' })
        }}
      />
      {sharedMimeType === 'text/plain' && <Text>{sharedData}</Text>}
      {sharedMimeType.startsWith('image/') && (
        <Image source={{ uri: sharedData }} />
      )}
    </View>
  )
}

AppRegistry.registerComponent('useShareFunction', () => useShareFunction)
AppRegistry.registerComponent('ShareMenuModuleComponent', () => Share)
