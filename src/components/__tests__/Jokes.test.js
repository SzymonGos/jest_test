import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Jokes from '../Jokes';
import { act } from 'react-dom/test-utils';


describe("<Jokes /> ", () => {

    afterEach(cleanup)

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
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});