/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/Crud.css";
import { Link } from "react-router-dom";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function DocumentAdd() {
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [date, setDate] = useState("");
  const [sender, setSender] = useState("");
  const [reciver, setReciver] = useState("");
  const [state, setState] = useState("");
  const [discription, setDiscription] = useState("");
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:5000/api/doc/getDocs"
    );
    setDocuments(result.data);
    console.log(result.data);
  }


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doc/createDoc", {
        title: title,
        docType: docType,
        authorName: authorName,
        authorEmail: authorEmail,
        date: date,
        sender: sender,
        reciver: reciver,
        state: state,
        discription: discription,
      });
      
      setTitle("");
      setDocType("");
      setAuthorName("");
      setAuthorEmail("");
      setDate("");
      setSender("");
      setReciver("");
      setState("");
      setDiscription("");

      message.success("Document Successful Created");

      navigate("/Crud");

      Load();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Edit-Add-document-menu">
      <h1>Add Documents Menu</h1>

      <form>
        <div className="container">
          <div className="custom-form">
            <div className="row">
              <div className="col">
                <label for="Title">Title :</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col">
                <label for="Document Type">Document Type :</label>
                <input
                  type="text"
                  placeholder=".docs/.ppt/.pdf/.audio.."
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="Author Name">Author Name :</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </div>
              <div className="col">
                <label for="Author Email">Author Email :</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="Reciver's Name">Reciver's Name :</label>

                <input
                  type="text"
                  value={reciver}
                  onChange={(e) => setReciver(e.target.value)}
                />
              </div>
              <div className="col">
                <label for="Sender's Name">Sender's Name :</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="Sent/Recived Date">Sent/Recived Date :</label>
                <input
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col">
                <label for="State">State :</label>
                <input
                  type="text"
                  placeholder="Sent/Recived"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label for="Discription">Discription :</label>
                <input
                  type="text"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="button-row">
          <button type="button" class="save-button" onClick={handleAdd}>
            Save
          </button>
          <Link to="/Crud">
            <button  class="back-button">
              Back to List
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default DocumentAdd;
