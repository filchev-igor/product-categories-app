import React from "react";
import {act, render, screen, fireEvent} from '@testing-library/react';
import App from '../App/index';
import userEvent from "@testing-library/user-event";

test("testing create items without database usage", async () => {
    window.confirm = jest.fn().mockImplementation(() => true);

    await act(async () => {
        render(<App isDatabaseTestAllowed={false}/>);
    });

    const itemInput = screen.getByTestId('item input');
    const priceInput = screen.getByTestId('price input');
    const addItemButton = screen.getByTestId('add item');

    fireEvent.change(itemInput, {target: {value: 'dogs'}});
    fireEvent.change(priceInput, {target: {value: '40'}});

    expect(itemInput.value).toBe('dogs');
    expect(priceInput.value).toBe('40');

    userEvent.click(addItemButton);

    expect(window.confirm).toHaveBeenCalled();

    expect(priceInput.value).toBe('');

    fireEvent.change(itemInput, {target: {value: 'cats'}});

    expect(itemInput.value).toBe('cats');

    userEvent.click(addItemButton);

    expect(itemInput.value).toBe('');
    expect(priceInput.value).toBe('');

    fireEvent.change(priceInput, {target: {value: 'cats'}});
    expect(priceInput.value).toBe('');
});
