import {render, screen, container, fireEvent, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'


import CrudDataRepository from '../../../../repositories/crudDataRepository';

import ThoughtsForm from '../../../../pages/components/Thoughts/Form'


// https://testing-library.com/docs/react-testing-library/cheatsheet

// <ThoughtsForm addThought={addThought} dataRepository={dataRepository} />



// const items = [{id: 1, content: 'some text'}, {id: 2, content: 'some other text'} ]


const text = 'Some text';
const addThought = (item) => {};
// const stubRepository = () => ({
//     createItem: async (data) => {
//         // return params.content here

//       console.log(data)

//         return { 'entity': { id: 1, content: 'some content'}};
//     }
// });



// const fn = jest.fn().mockName('Unicorn')

// const dataRepository = stubRepository();

// const stubRepository = () => ({});

jest.mock('../../../../repositories/crudDataRepository');
// const dataRepository = jest.mocked(stubRepository);
const mockCreate = jest.fn();
mockCreate.mockImplementation();
CrudDataRepository.mockImplementation(() => {
  return {
    createItem: mockCreate,
  };
});
const dataRepository = CrudDataRepository();

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}


test('renders form', async () => {
  const {container} = render(<ThoughtsForm addThought={addThought} dataRepository={dataRepository}/>)

  expect(container).toMatchSnapshot();
});

test('calls data repository to submit new entity', async () => {
  const {container} = render(<ThoughtsForm addThought={addThought} dataRepository={dataRepository}/>)
  const input = container.querySelector('textarea');

  act(() => {
    fireEvent.change(input, {target: {value: text}})
  });
  
  await act( async () => {
    fireEvent.click(screen.getByText('Submit'))
  });

  expect(container).toMatchSnapshot();
  expect(mockCreate).toBeCalledWith({"thought": {"content": "Some text"}})
});

test('sends file as base64 string', async () => {
  const {container} = render(<ThoughtsForm addThought={addThought} dataRepository={dataRepository}/>)

  const blob = new Blob(['str']);
  const file = new File([blob], 'values.json', { type: 'application/JSON'});
  File.prototype.text = jest.fn().mockResolvedValueOnce('str');

  const input = container.querySelector("[type='file']");

  await act( async () => {
    await userEvent.upload(input, file);
    await timeout(10);
  });


  await act( async () => {
    await userEvent.click(screen.getByText('Submit'));
    await timeout(10);
  });

  expect(mockCreate).toBeCalledWith({
      thought: { content: '' },
      file: {
        convert_to_text: true,
        filename: 'values.json',
        type: 'application/json',
        file_base64: 'c3Ry'
      }
  });
  
  expect(container).toMatchSnapshot();
});
