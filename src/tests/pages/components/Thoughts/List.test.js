import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import ThoughtsList from '../../../../pages/components/Thoughts/List';

// https://testing-library.com/docs/react-testing-library/cheatsheet

const items = [{id: 1, content: 'some text'}, {id: 2, content: 'some other text'} ]

test('displays list of items', async () => {
  const {asFragment, getByText} = render(<ThoughtsList items={items}/>)

  expect(getByText(items[0].content)).toBeInTheDocument()
  expect(getByText(items[1].content)).toBeInTheDocument()
})
