import { waitFor, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react-hooks'

import { supabase } from '../../src/clients/supabase'
import { HomeScreen } from '../../src/views/Home'
import { mockDefinitionsData } from '../__mocks__/definitionsMock'
import { render } from '../test-utils/test-utils'

jest.mock('../../src/clients/supabase')
const setupComponent = ({ props }: any) => {
  ;(supabase.from as jest.Mock).mockReturnValue({
    select: jest.fn().mockResolvedValue({ data: props.data, error: null }),
  })

  return render(<HomeScreen />)
}

describe('Home component', () => {
  test('renders correctly', async () => {
    const container = setupComponent({
      props: {
        data: mockDefinitionsData,
      },
    })

    expect(container.getByTestId('add-word-input')).toBeTruthy()
    expect(container.getByTestId('add-word-button')).toBeTruthy()
    expect(container.getByTestId('paste-button')).toBeTruthy()
    expect(container.getByTestId('word-list')).toBeTruthy()

    await waitFor(() => {
      // console.log(container.getByTestId(`word-0`))
      const word = container.getByTestId(`word-0`)

      expect(container.getByTestId(`word-0`)).toBeTruthy()
      // expect(container.getByTestId(`word-0`)).toHaveTextContent('hello')
      expect(container.getByTestId(`word-1`)).toBeTruthy()
      expect(container.getByTestId(`definition`)).toBeTruthy()
    })
  })
})

// renders word input with placeholder word to add
// renders add word button
// renders paste button
// renders word list
// renders definition modal
