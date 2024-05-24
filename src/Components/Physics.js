import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const Physics = () => {
  const { data, setData} = useContext(AppContext)

  const [modalData, setModalData] = useState([])
  const [noteVal, setNoteVal] = useState("")
  const handleStatusChange = async (item, preStatus) => {
    // console.log(item)
    // console.log("Status updated Successfully")
    let row = document.getElementById(item["id"])
    let newStatus = "Incomplete"
    if (preStatus === "Incomplete") {
      // row.style.backgroundColor = "darkorange"
      newStatus = "Ongoing"
    }
    else if (preStatus === "Ongoing") {
      // row.style.backgroundColor = "green"
      newStatus = "Complete"
    }

    if (newStatus === "Incomplete")
    {
      // console.log(row)
      if(row.id >= 18)
      row.style.backgroundColor = "darkslategray"
      else
      row.style.backgroundColor = "transparent"
    }
    else if (newStatus === "Ongoing")
      row.style.backgroundColor = "darkorange"
    else 
    row.style.backgroundColor = "green"
    item["status"] = newStatus
    // console.log(item)
    try {
      const response = await axios.put(`https://deepak1104.pythonanywhere.com/api/update/${item.id}`, item, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log('Update successful:', response.data);
      const newData = data.map(Item =>
        Item.id === item.id ? response.data : Item
      );
      setData(newData);

    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  useEffect(() => {
    data.forEach(item => {
      let row = document.getElementById(item.id);
      if (row) {
        setRowColor(row, item.status);
      }
    });
  }, [data]);

  const setRowColor = (row, status) => {
    if (status === 'Incomplete') {
      if (row.id >= 18)
      row.style.backgroundColor = 'darkslategray';
      else
      row.style.backgroundColor = 'transparent';
    } else if (status === 'Ongoing') {
      row.style.backgroundColor = 'darkorange';
    } else if (status === 'Complete') {
      row.style.backgroundColor = 'green';
    }
  };

  const handleLaunchModal = (item) => {
    // console.log(item)
    setModalData(item)
    setNoteVal(item["note"])
    const btn = document.getElementById("mod")
    if (btn) {
      btn.click()
    }
  }
  const handleTextChange = (e) => {
    setNoteVal(e.target.value)
  }
  const handleAddNote = async() => {
    // console.log(noteVal)
    // console.log(modalData)
    let item = modalData
    item["note"] = noteVal
    try {
      const response = await axios.put(`https://deepak1104.pythonanywhere.com/api/update/${item.id}`, item, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log('Update successful:', response.data);
      const newData = data.map(Item =>
        Item.id === item.id ? response.data : Item
      );
      setData(newData);
      const btn = document.getElementById("mcloser")
      if (btn)
      {
        btn.click()
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }
  return (
    <>
      <div className="card text-bg-dark border-info" style={{ height: '65vh', marginTop:"30px" }}>
        <div className="card-body overflow-auto">
          <table className='table2'>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Chapter name</th>
                <th>Status</th>
                <th style={{ textAlign: "center" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map(ind => (
                <React.Fragment key={ind}>
                  {data[ind]["subject"] === "Physics" && (
                    <tr id={Number(ind) + 1}
                      style={{
                        backgroundColor: Number(ind) + 1 >= 18 ? "darkslategray" : "transparent"
                      }}>
                      <td>{Number(ind) + 1}</td>
                      <td>{data[ind]["chpName"]}</td>
                      <td style={{ cursor: "pointer" }} onClick={() => handleStatusChange(data[ind], data[ind]["status"])}>{data[ind]["status"]}</td>
                      <td style={{ textAlign: "center" }}><FontAwesomeIcon style={{ cursor: "pointer" }} icon={faNoteSticky} onClick={() => handleLaunchModal(data[ind])} /></td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

        </div>
      </div>
        {/* <h3 style={{marginTop:"20px"}}>Statistics : </h3> */}

      {/* <!-- Button trigger modal --> */}
      <button type="button" className="btn btn-primary" id="mod" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div className="modal-content" style={{ backgroundColor: "#3C3C3C" }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{textAlign:"center", color:"gold"}}>[{modalData["subject"]}] - {modalData["chpName"]}</h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <div className="modal-body">
            
                {/* <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label> */}
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" value={noteVal} onChange={handleTextChange} style={{background:"transparent", color:"white"}}></textarea>
             
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" id="mcloser" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-info btn-sm" onClick={() => handleAddNote()}>Add Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Physics
