import {
  Button as ButtonTemplate,
  ButtonProps as PaperButtonProps,
} from 'react-native-paper'

interface ButtonProps extends Omit<PaperButtonProps, 'children'> {
  onPress: () => void
  testID?: string
  buttonText: string
}

export const Button = ({
  onPress,
  testID,
  buttonText,
  ...props
}: ButtonProps) => {
  return (
    <ButtonTemplate
      labelStyle={{ textTransform: 'uppercase' }}
      style={{ margin: 5, borderRadius: 5 }}
      testID={testID}
      onPress={onPress}
      mode="contained"
      {...props}
    >
      {buttonText}
    </ButtonTemplate>
  )
}
