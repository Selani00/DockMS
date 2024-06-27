import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/Crud.css";
import Nav from "./navCrud";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function DocumentCrud() {
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState("");
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
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  const goBack = () => {
    navigate("/Crud");
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:5000/api/doc/getDocs"
    );
    setDocuments(result.data);

  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredDocuments = documents.filter((document) => {
    return document.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  async function editdocument(document) {
    setId(document.docId);
    setTitle(document.title);
    setDocType(document.docType);
    setAuthorName(document.authorName);
    setAuthorEmail(document.authorEmail);
    setDate(document.date);
    setSender(document.sender);
    setReciver(document.reciver);
    setState(document.state);
    setDiscription(document.discription);
    setIsActive(true);

    
  }

  async function deletedocument(id) {
    await axios.delete(
      `http://localhost:5000/api/doc/deleteDoc/${id}`
    );
    message.success("Successful Delete the document");
    setId("");
    setTitle("");
    setDocType("");
    setAuthorName("");
    setAuthorEmail("");
    setDate("");
    setSender("");
    setReciver("");
    setState("");
    setDiscription("");
    Load();
  }


  async function update(e) {
    e.preventDefault();
  
    if (!id) {
      console.error("Document ID is not set");
      alert("Document ID is not set. Cannot update the document.");
      return;
    }
  
    const payload = {
      docId: id,
      title: title,
      docType: docType,
      authorName: authorName,
      authorEmail: authorEmail,
      date: date,
      sender: sender,
      reciver: reciver,
      state: state,
      discription: discription,
    };
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await axios.put(
        "http://localhost:5000/api/doc/updateDoc",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      message.success("Successfully updated the document details");
      setId("");
      setTitle("");
      setDocType("");
      setAuthorName("");
      setAuthorEmail("");
      setDate("");
      setSender("");
      setReciver("");
      setState("");
      setDiscription("");
      setIsActive(false);

      Load();
    } catch (error) {
      console.error("Error updating document:", error.response || error.message);
      alert(error.response?.data || error.message);
    }
  }
  
  
  if (isActive === false) {
    return (
      <div>
        <Nav />
        <div className="hero-section1">
          <div className="All-Content">
            <div className="SearchBar">
              <input
                type="text"
                placeholder="Search the document by Title"
                onChange={(e) => handleSearch(e.target.value)}
              ></input>
            </div>
            <div className="Table-Area">
              <h1>List of Documents</h1>
              <div className="tableContainer">
                <table className="table" border="1">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Document Type</th>
                      <th scope="col">Author Name</th>
                      <th scope="col">Author Email</th>
                      <th scope="col">Recive Date</th>
                      <th scope="col">Sender</th>
                      <th scope="col">Reciver</th>
                      <th scope="col">State</th>
                      <th scope="col">Discription</th>
                      <th scope="col">Operations</th>
                    </tr>
                  </thead>
                  {filteredDocuments.map(function fn(document) {
                    return (
                      <tbody key={document.docId}>
                        <tr>
                          <td>{document.title}</td>
                          <td>{document.docType}</td>
                          <td>{document.authorName}</td>
                          <td>{document.authorEmail}</td>
                          <td>{document.date}</td>
                          <td>{document.sender}</td>
                          <td>{document.reciver}</td>
                          <td>{document.state}</td>
                          <td>{document.discription}</td>
                          <td>
                            <button
                              className="update-button"
                              type="button"
                              onClick={() => editdocument(document)}
                            >
                              Edit
                            </button>
                            <button
                              className="delete-button"
                              type="button"
                              onClick={() => deletedocument(document.docId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
            <Link to="/Add">
              <button className="create-button">Create</button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Edit-Add-document-menu">
        <h1>Edit Document's delails</h1>
        <form>
          <div className="container">
            <div className="custom-form">
              <div class="row">
                <div class="col">
                  <label for="Title">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label for="Document Type">Document Type</label>
                  <input
                    type="text"
                    placeholder=".docs/.ppt/.pdf/.audio.."
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label for="Author Name">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                  />
                </div>
                <div className="col">
                  <label for="Author Email">Author Email</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="Reciver's Name">Reciver's Name</label>
                  <input
                    type="text"
                    value={reciver}
                    onChange={(e) => setReciver(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="Sender's Name">Sender's Name</label>
                  <input
                    type="text"
                    placeholder="Sender's Name"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label for="Date">Sent/Recived Date</label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="State">State</label>
                  <input
                    type="text"
                    placeholder="Sent/Recived"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="Discription">Discription</label>
                  <input
                    type="text"
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="button-row">
            <button type="button" class="save-button" onClick={update}>
              Save
            </button>

            <button class="back-button" onClick={goBack}>
              Back to List
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DocumentCrud;
