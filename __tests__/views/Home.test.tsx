import React from 'react'

import { HomeScreen } from '../../src/views/Home'
import { render } from '../test-utils/test-utils'

describe('Home component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<HomeScreen />)

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
