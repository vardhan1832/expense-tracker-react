import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Dummy from "./Dummy";

test('searching for app text', () => {
    render(<Dummy/>);

    const exptst = screen.getByText('hello world');
    expect(exptst).toBeInTheDocument();
});

test('testing for button', () => {
    render(<Dummy/>);

    const button = screen.getByText('Change');
    expect(button).toBeInTheDocument();
});

test('testing for button clicked then changed text', async () => {
    render(<Dummy/>);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const changedText = screen.getByText('Changed');
        expect(changedText).toBeInTheDocument();
    });
});
