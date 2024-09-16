import { renderHook, act } from '@testing-library/react-hooks'
import {
  waitFor,
  fireEvent,
  within,
  screen,
} from '@testing-library/react-native'
import '@testing-library/jest-dom'

import '../../src/clients/supabase'
import { HomeScreen } from '../../src/views/Home'
import { mockDefinitionsData } from '../__mocks__/definitionsMock'
import { render } from '../test-utils/test-utils'
import '@supabase/supabase-js'

const props = {
  data: mockDefinitionsData.definition,
}

jest.mock('../../src/clients/supabase')
const setupComponent = ({ props }: any) => {
  return render(<HomeScreen {...props} />)
}

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn().mockImplementation(() => {
      return {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          data: props.data,
          error: null,
        })),
        update: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockReturnThis(),
          in: jest.fn().mockReturnThis(),
          is: jest.fn().mockReturnThis(),
          order: jest.fn().mockReturnThis(),
          gte: jest.fn().mockReturnThis(),
          lte: jest.fn().mockReturnThis(),
          select: jest.fn().mockReturnThis(),
          data: props.data,
          error: null,
        })),
      }
    }),
    setTestData: (newData: any) => {
      props.data = newData
    },
  }
})

const setupHook = ({ props }: any) => {
  return renderHook(() => HomeScreen())
}

describe('Home component', () => {
  beforeEach(() => {
    const { setTestData } = require('@supabase/supabase-js')
    setTestData([])
  })

  test('renders correctly', async () => {
    const container = setupComponent({ props })
    const { result } = setupHook({ props })

    const dataReturn = result.current
    const input = container.getByTestId('add-word-input')

    expect(input).toBeTruthy()
    expect(dataReturn).toBeTruthy()
    expect(container.getByTestId('add-word-button')).toBeTruthy()
    expect(container.getByTestId('paste-button')).toBeTruthy()
    expect(container.getByTestId('word-list')).toBeTruthy()

    await waitFor(() => {
      const word = container.getByTestId(`word-0`)
      const wordText = within(word).getByText('hello')

      expect(word).toBeTruthy()
      expect(wordText).toBeTruthy()

      const word2 = container.getByTestId(`word-1`)
      const wordText2 = within(word2).getByText('value')

      expect(word2).toBeTruthy()
      expect(wordText2).toBeTruthy()
    })
  })
})

// renders word input with placeholder word to add
// renders add word button
// renders paste button
// renders word list
// renders definition modal
