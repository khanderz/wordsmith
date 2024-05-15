import { waitFor, fireEvent, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react-hooks'

import { supabase } from '../../src/clients/supabase'
import { HomeScreen } from '../../src/views/Home'
import { mockDefinitionsData } from '../__mocks__/definitionsMock'
import { render } from '../test-utils/test-utils'

jest.mock('../../src/clients/supabase')
const setupComponent = ({ props }: any) => {
  return render(<HomeScreen />)
}

const setupHook = ({ props }: any) => {
  // const { data, error } = await supabase.from('definition').select('*')
  ;(supabase.from as jest.Mock).mockReturnValue({
    select: jest.fn().mockReturnValue({
      data: mockDefinitionsData,
      error: null,
    }),
  })

  return supabase.from('definition').select('*')
}

describe('Home component', () => {
  const props = {
    data: mockDefinitionsData,
  }
  test('renders correctly', async () => {
    const container = setupComponent({ props })
    const { result } = renderHook(() =>
      setupHook({
        props,
      }),
    )

    const dataReturn = result.current

    expect(container.getByTestId('add-word-input')).toBeTruthy()
    expect(dataReturn).toBeTruthy()
    // expect(container.getByTestId('add-word-button')).toBeTruthy()
    // expect(container.getByTestId('paste-button')).toBeTruthy()
    // expect(container.getByTestId('word-list')).toBeTruthy()

    await waitFor(() => {
      // console.log(container.getByTestId(`word-0`))
      // const word = container.getByTestId(`word-0`)
      console.log(result.current)
      // expect(container.getByTestId(`word-0`)).toBeTruthy()
      // expect(container.getByTestId(`word-0`)).toHaveTextContent('hello')
      // expect(container.getByTestId(`word-1`)).toBeTruthy()
      // expect(container.getByTestId(`definition`)).toBeTruthy()
    })
  })
})

// renders word input with placeholder word to add
// renders add word button
// renders paste button
// renders word list
// renders definition modal
