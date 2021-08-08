import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import List from '../List';


describe('<List />', () => {

    afterEach(cleanup);

    it('render the correct content', () => {
        render(<List />);
        const input = screen.getByTestId('input-field');
        const addButton = screen.getByTestId('add-button');
        const notesCounter = screen.getByTestId('countNotes');

        expect(input).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(notesCounter).toHaveTextContent("0 note(s)")
    });

    it("allow users to add a new note", () => {
        render(<List />);
        const input = screen.getByTestId('input-field');
        const addButton = screen.getByTestId('add-button');
        const notesCounter = screen.getByTestId('countNotes');

        // Add the new note
        fireEvent.change(input, { target: { value: 'My new note' } });
        fireEvent.click(addButton);

        const notes = screen.queryAllByTestId('note');
        const note = screen.queryByTestId('note');
        const noteElement = note.firstChild;

        // Note title should match "My new note"
        expect(noteElement.textContent).toBe('My new note');

        // Counter should show "1 note(s)"
        expect(notesCounter).toHaveTextContent('1 note(s)')

        // The input field should be blank.
        expect(input.value).toBe('')

        // The note should be in the document.
        expect(note).toBeInTheDocument();

        // There should be 1 note in the document.
        expect(notes.length).toBe(1);
    });

    it("allow users to delete note", () => {
        render(<List />);
        const input = screen.getByTestId('input-field');
        const addButton = screen.getByTestId('add-button');
        const notesCounter = screen.getByTestId('countNotes');

        // Add the new note
        fireEvent.change(input, { target: { value: 'Note to delete' } });
        fireEvent.click(addButton);

        // Created note
        const note = screen.queryByTestId('note');

        // Click delete button
        const deleteNoteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteNoteButton);

        const notes = screen.queryAllByTestId('note');

        // Counter should show "0 note(s)"
        expect(notesCounter).toHaveTextContent('0 note(s)');

        // Created note should not be in the document
        expect(note).not.toBeInTheDocument();

        // There should be 0 note in the document.
        expect(notes.length).toBe(0);
    });

    it("prevent user to add an empty note", () => {
        render(<List />);
        const input = screen.getByTestId('input-field');
        const addButton = screen.getByTestId('add-button');
        const notesCounter = screen.getByTestId('countNotes');

        // Ateempt to add an empty note
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(addButton);

        // Trying to create an empty string
        // I used queryByTestId/queryAllByTestId because 
        // I expect there will be no matches to the query
        const note = screen.queryByTestId('note');
        const notes = screen.queryAllByTestId('note');
        
        // Counter should show "0 note(s)"
        expect(notesCounter).toHaveTextContent('0 note(s)');

        // Created note should not be in the document
        expect(note).not.toBeInTheDocument();

        // There should be 0 note in the document.
        expect(notes.length).toBe(0);
    });
})