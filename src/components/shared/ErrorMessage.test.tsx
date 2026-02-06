import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage"


describe("ErrorMessage",()=>{
    it("show error message",()=>{
        render(
            <ErrorMessage message="show error message one" onRetry={()=>{}}/>
        )

        expect(screen.getByText("show error message one")).toBeInTheDocument();
    })
})