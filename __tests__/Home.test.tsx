import {render, screen} from "@testing-library/react"
import Home from "@/app/page"

describe('first', () => { 

    it('should render home text', () => {
        render(<Home/>)  //ARRANGE

        const myElem = screen.getByText('Home') //ACT

        expect(myElem).toBeInTheDocument(); //ASSERTION

        
    })

 })