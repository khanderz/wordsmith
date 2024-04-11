import { renderHook, act } from '@testing-library/react-hooks'

import { supabase } from '../../src/clients/supabase'
import { HomeScreen } from '../../src/views/Home'
import { render } from '../test-utils/test-utils'

jest.mock('../../src/clients/supabase')
const setupComponent = ({ props }: any) => {
  ;(supabase.from as jest.Mock).mockReturnValue({
    select: jest.fn().mockResolvedValue({ data: props.data, error: null }),
  })

  return render(<HomeScreen />)
}

describe('Home component', () => {
  test('renders correctly', () => {
    const { getByTestId } = setupComponent({
      props: {
        data: [],
      },
    })

    // Assert that the AddWordInput is rendered
    expect(getByTestId('add-word-input')).toBeTruthy()

    // Assert that the AddWordButton is rendered
    expect(getByTestId('add-word-button')).toBeTruthy()

    // Assert that the PasteButton is rendered
    expect(getByTestId('paste-button')).toBeTruthy()

    // Assert that the WordList is rendered
    expect(getByTestId('word-list')).toBeTruthy()

    // Assert that the DefinitionModal is rendered
    expect(getByTestId('definition-modal')).toBeTruthy()
  })
})

// renders word input with placeholder word to add
// renders add word button
// renders paste button
// renders word list
// renders definition modal
