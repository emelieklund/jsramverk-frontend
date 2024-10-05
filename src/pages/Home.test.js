import { render, screen, cleanup } from '@testing-library/react';
import Home from './Home.js';

afterEach(() => {
    cleanup();
});

test('expect h2 element to be in document', () => {
    render(<Home />);

    const h2Element = screen.getByText(/create a new document/i);

    expect(h2Element).toBeInTheDocument();
});

test('expect div with test-id "doc-div" to be in document', () => {
    render(<Home />);

    const docDiv = screen.getByTestId("doc-div");

    expect(docDiv).toBeInTheDocument();
});

test('temporary', () => {
    expect(true).toBe(true);
});
