import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Home from './Home.js';

beforeEach(() => {
    render(<Home />);
});

afterEach(() => {
    cleanup();
});

test('expect h2 element to be in document', () => {
    const h2Element = screen.getByText(/create a new document/i);

    expect(h2Element).toBeInTheDocument();
});

// test('title variable gets value', async () => {
//     const inputValue = "A nice title";
//     const user = userEvent.setup();
//     const inputNode = screen.getByLabelText(/title/i)

//     await user.type(inputNode, inputValue);

//     const title = screen.getByDisplayValue(inputValue);

//     expect(title).toHaveValue(inputValue);
// });
