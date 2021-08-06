import { render, cleanup, screen } from '@testing-library/react';
import React from 'react';
import List from '../List';
import ReactDOM from 'react-dom';

describe('<List />', () => {

    afterEach(cleanup);

    it('render the initial content', () => {
        render(<List />);
        const input = screen.getByTestId('input-field');
        const button = screen.getByTestId('add-button');
        const notesCounter = screen.getByTestId('countNotes');

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(notesCounter).toHaveTextContent("0 note(s)")
    });

    it.todo("allow users to add a new note");

    it.todo("allow users to delete new note");
})