import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import './Summary.css'; // Import the CSS file for styling

const Summary = () => {
  const { data } = useContext(AppContext);
  const [count, setCount] = useState({
    "Total": {
      "done": 0,
      "total": 100
    },
    "Physics": {
      "done": 0,
      "total": 100
    },
    "Chemistry": {
      "done": 0,
      "total": 100
    },
    "Biology": {
      "done": 0,
      "total": 100
    }
  });

  useEffect(() => {
    let p = 0, c = 0, b = 0;
    let total = data.length
    let pT = 0, cT = 0, bT = 0, totalComplete = 0;
    for (const i in data) {
      if (data[i]["subject"] === "Physics") {
        pT += 1;
        if (data[i]["status"] === "Complete") {
          p += 1;
          totalComplete += 1
        }
      } else if (data[i]["subject"] === "Chemistry") {
        cT += 1;
        if (data[i]["status"] === "Complete") {
          c += 1;
          totalComplete += 1
        }
      } else {
        bT += 1;
        if (data[i]["status"] === "Complete") {
          b += 1;
          totalComplete += 1
        }
      }
    }
    // console.log(totalComplete)
    setCount({
      "Total": {
        "done": totalComplete,
        "total": total
      },
      "Biology": {
        "done": b,
        "total": bT
      },
      "Physics": {
        "done": p,
        "total": pT
      },
      "Chemistry": {
        "done": c,
        "total": cT
      },
    });
  }, [data]);

  return (
    // <div className="summary-container" style={{ marginTop: "60px" }}>
    //   {Object.keys(count).map((subject) => (
    //     <div key={subject} className="progress-bar">
    //       {subject == "Total"? (
    //         <>
    //         <CircularProgressbar value={40} text={`${40}%`}
    //         styles={buildStyles({
    //           // backgroundColor: "red",
    //           textColor: "white",
    //           pathColor: "cyan",
    //           trailColor: "grey",
    //           // textSize: "10px"
    //         })}
    //       />
    //       <div className="subject-label">{subject}</div>
    //         </>
    //       ): (
    //         <>
    //         <CircularProgressbar value={40} text={`${40}%`}
    //       styles={buildStyles({
    //         // backgroundColor: "red",
    //         textColor: "white",
    //         pathColor: "yellow",
    //         trailColor: "grey",
    //         // textSize: "10px"
    //       })}
    //     />
    //     <div className="subject-label">{subject}</div>
    //     </>
    //       )}

    //     </div>
    //   ))}

    //   {/* <div key="pie" className="progress-bar">
    //     <CircularProgressbar value={40} text={`${40}%`}
    //       styles={buildStyles({
    //         // backgroundColor: "red",
    //         textColor: "white",
    //         pathColor: "cyan",
    //         trailColor: "grey",
    //         // textSize: "10px"
    //       })}
    //     />
    //   </div> */}
    // </div>
    <div className="summary-container" style={{ marginTop: "60px" }}>
      {Object.keys(count).map((subject) => (
        <div key={subject} className={`progress-bar ${subject === "Total" ? "total-size" : ""}`}>
          <CircularProgressbar
            value={count[subject].total === 0 ? 0 : (count[subject].done / count[subject].total) * 100}
            text={`${count[subject].total === 0 ? 0 : Math.round((count[subject].done / count[subject].total) * 100)}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: subject === "Total" ? "cyan" : "yellow",
              trailColor: "grey",
            })}
          />
          <div className="subject-label">{subject}</div>
        </div>
      ))}
    </div>
  );
};

export default Summary;
