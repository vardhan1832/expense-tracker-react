import { Fragment, useState } from "react"
const Dummy = ()=>{
    const [changed, setchanged] = useState(false)
    const clickhandler = ()=>{
        setchanged(true)
    }
    return (
        <Fragment>
        <p>hello world</p>
        {!changed && <p>Not clicked</p>}
        {changed && <p>Changed</p>}
        <button onClick={clickhandler}>Change</button>
        </Fragment>
    )
}

export default Dummy