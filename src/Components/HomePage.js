import React, { useContext, useEffect, useState } from 'react'
import Summary from "./Summary"
import Physics from "./Physics"
import Chemistry from "./Chemistry"
import Biology from "./Biology"
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
const HomePage = () => {
    const {data, setData} = useContext(AppContext)
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [sub, setSub] = useState("Summary")
    const handleClick = () => {
        // console.log(indeterminate)
        // console.log(checked)
        // console.log("\n")
        if (indeterminate) {
            setChecked(true);
            setIndeterminate(false);
        } else if (!checked) {
            setIndeterminate(true);
        } else {
            setChecked(false);
        }
    };
    const handleSubChange = (subject) => {
        setSub(subject)
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://deepak1104.pythonanywhere.com/api/list/')
            // console.log(response.data)
            setData(response.data)
        }

        fetchData();
    }, [])
    return (
        <div>
            <nav className="nav nav-pills flex-column flex-sm-row">
                <a className={`flex-sm-fill text-sm-center nav-link ${sub==="Summary"? "link-dark" : "link-light"} ${sub==="Summary"? "active" : ""}`} id={`${sub==="Summary"? "navcyan" : ""}`} onClick={() => handleSubChange("Summary")} href="#">Summary</a>
                <a className={`flex-sm-fill text-sm-center nav-link ${sub==="Physics"? "link-dark" : "link-light"} ${sub==="Physics"? "active" : ""}`} id={`${sub==="Physics"? "navcyan" : ""}`} onClick={() => handleSubChange("Physics")} href="#">Physics</a>
                <a className={`flex-sm-fill text-sm-center nav-link ${sub==="Chemistry"? "link-dark" : "link-light"} ${sub==="Chemistry"? "active" : ""}`} id={`${sub==="Chemistry"? "navcyan" : ""}`} onClick={() => handleSubChange("Chemistry")} href="#">Chemistry</a>
                <a className={`flex-sm-fill text-sm-center nav-link ${sub==="Biology"? "link-dark" : "link-light"} ${sub==="Biology"? "active" : ""}`} id={`${sub==="Biology"? "navcyan" : ""}`} onClick={() => handleSubChange("Biology")} href="#">Biology</a>
            </nav>

            <div className='container'>
                {sub === "Summary" && (
                    <Summary />
                )}
                {sub === "Physics" && (
                    <Physics />
                )}
                {sub === "Chemistry" && (
                    <Chemistry />
                )}
                {sub === "Biology" && (
                    <Biology />
                )}
            </div>

        </div>
    )
}

export default HomePage
