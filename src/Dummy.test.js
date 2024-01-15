import { render , screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dummy from "./Dummy";
test('searching for app text',()=>{
    render(<Dummy/>)

    const exptst = screen.getByText('hello world')
    expect(exptst).toBeInTheDocument()
})