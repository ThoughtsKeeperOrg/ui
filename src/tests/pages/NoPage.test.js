import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import NoPage from '../../pages/NoPage';

// import userEvent from '@testing-library/user-event'
// import mockAxios from 'jest-mock-axios';

// https://testing-library.com/docs/react-testing-library/cheatsheet

test('displays 404 page', async () => {
  render(<NoPage />)

  const items = await screen.findAllByText('404')
  expect(items).toHaveLength(1)
})
