import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import upload from "../utilities/Upload";
import axios from "axios";

const PopupBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const PopupContainer = styled.div`
  position: relative;
  background-color: rgb(0, 103, 71);
  border-radius: 8px;
  padding: 20px;
  width: 725px;
  height: 625px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4); 
`;

const ImageContainer = styled.div`
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;



const ItemContainer = styled.form`
  flex: 1;
  height: 95%;
  display: flex;
  align-items: flex-start;
  width: 50%;
  flex-direction: column;
  cursor: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.3);
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4); 
  &:focus {
    outline: none;
    border: 1px solid #4caf50;
    box-shadow: 0 0 5px 1px #4caf50;
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
  &:hover {
    color: #4caf50;
  }
`;

const Asterisk = styled.span`
  color: red;
  margin-left: 2px;
`;

const Select = styled.select`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4); 
`;

const DescriptionInput = styled.textarea`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px; /* Increased margin-bottom for longer text box */
  resize: vertical;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4); 
  &:focus {
    outline: none;
    border: 1px solid #4caf50;
    box-shadow: 0 0 5px 1px #4caf50;
  }

`;

const CreateButton = styled.input`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease; // Add transition for smooth hover effect
  &:hover {
    background-color: #45a049; // Add hover color change
  }
`;



const FileInput = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;  
  &:hover {
    background-color: rgb(0, 110, 81);
    } // Change color when hovered
`

const FileLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  cursor: pointer;
  margin: 10px;
  background-color: rgb(0, 90, 71);
`;


function Popup({ setOpenPopup }) {
  const handleClose = () => {
    setOpenPopup(false);
  };

  const [files_raw, setfile_raw] = useState([]);

  const userid = localStorage.getItem("_id");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    user: userid,
    price: "",
    title: "",
    description: "",
    category: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [multipleImages, setMultipleImages] = useState([]);
  // Functions to preview multiple images
  const changeMultipleFiles = (e) => {
    if (e.target.files) {
      const imageArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const stringarray = Array.from(e.target.files).map((file) => file);
      setMultipleImages((prevImages) => prevImages.concat(imageArray));
      setfile_raw((prevImages) => prevImages.concat(stringarray));
    }
  };

  const upload_files = async () => {
    let arr = [];
    await Promise.all(
      files_raw.map(async (e) => {
        const url = await upload(e);
        arr.push(url);
      })
    );
    formData["images"] = arr;
  };

  const HandleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    await upload_files();
    
    console.log(formData);
    try {
      //   await axios.
      const res = await axios.post(`${process.env.REACT_APP_SERVER}api/items/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      console.log(res);
      setMultipleImages([]);
      window.location.reload();
      setErrorMessage(null);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }finally {
      setLoading(false);
    }
  };

  const render = (data) => {
    return data.map((image) => {
      return (
        <img
          style={{ height: "100px", width: "100px", margin: "10px" }}
          className="image"
          src={image}
          alt=""
          key={image}
        />
      );
    });
  };

  const [errorMessage, setErrorMessage] = useState(null);


  return (
    <PopupBackground>
      <PopupContainer>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <ImageContainer>
          {/* <ImageBoxUpload htmlFor="image-upload">
            <ImageBox>Image Placeholder</ImageBox>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ImageBoxUpload> */}
          {render(multipleImages)}
          <FileLabel htmlFor="file-input">
    Select Images
    <FileInput
      id="file-input"
      type="file"
      name="file1"
      multiple
      onChange={changeMultipleFiles}
    />
</FileLabel>

          
        </ImageContainer>
        <ItemContainer onSubmit={HandleSubmit}>
          <Label>
            Title
            <Asterisk>*</Asterisk>
          </Label>
          <Input  
            name="title"
            type="text"
            placeholder="Enter name"
            onChange={HandleChange}
            required
          />
          <Label>
            Price
            <Asterisk>*</Asterisk>
          </Label>
          <Input
            name="price"
            type="text"
            placeholder="Enter name"
            onChange={HandleChange}
            required
          />
          <Label>
            Description
            <Asterisk>*</Asterisk>
          </Label>
          <DescriptionInput
            name="description"
            placeholder="Enter description"
            onChange={HandleChange}
            required
          ></DescriptionInput>
          <Label>
            Category
            <Asterisk>*</Asterisk>
          </Label>
          <Select name="category" onChange={HandleChange} required>
            <option value="">Select category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Lease/subleases">Lease/subleases</option>
            <option value="Selling Services">Selling Services</option>
            <option value="Auto">Auto</option>
            <option value="Book">Book</option>
          </Select>
          {
              loading ? (
                "Loading..."
              ) : (
                <>
                  {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
                  <CreateButton type="submit" value="Submit" />
                </>
              )
            }
        </ItemContainer>
      </PopupContainer>
    </PopupBackground>
  );
}

export default Popup;
