import {
  TextInput as TextInputPaper,
  TextInputProps as TextInputPaperProps,
} from 'react-native-paper'

interface TextInputProps extends TextInputPaperProps {}

export const TextInput = ({ ...props }: TextInputProps) => {
  return (
    <TextInputPaper
      {...props}
      mode="outlined"
      style={{ width: '90%', margin: 5 }}
    />
  )
}
