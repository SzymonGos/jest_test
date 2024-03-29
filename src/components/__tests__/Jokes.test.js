import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Jokes from '../Jokes';
import { act } from 'react-dom/test-utils';

afterEach(cleanup)

describe("<Jokes /> ", () => {

    it("load a joke correctly", async () => {
        // Mock API
        jest.spyOn(global, 'fetch')
            .mockImplementation(() => Promise.resolve({
                status: 200,
                json: () => Promise.resolve({
                    icon_url: 'http://image.png',
                    value: 'joke test'
                })
            }));

        await act(async () => render(<Jokes />));
        
        // Generate initial random joke
        expect(screen.getByTestId("fetch-joke").textContent).toBe('\"joke test\"');

        // Fetched icon should be in the document
        expect(screen.getByTestId('fetch-img')).toBeInTheDocument();

        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Make sure that right API was called
        expect(global.fetch.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random");

        global.fetch.mockClear();
    });

    it("display 'Loading...' while clikcing the button", async () => {
        await act(async () => render(<Jokes />));

        // Check if button is in the body of the document
        const button = screen.getByTestId('fetch-btn');
        expect(button).toBeInTheDocument();

        // Simulate button click to check if 'Loading...' appear in the document
        fireEvent.click(button);
        expect(screen.getByTestId('fetch-loading').textContent).toBe("Loading...");
    })
});
