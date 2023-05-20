import React from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

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
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 725px;
  height: 625px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border: 1px solid #ccc;
`;

const ImageBox = styled.div`
  width: 90%;
  height: 90%;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.div`
  flex: 1;
  height: 85%;
  display: flex;
  align-items: flex-start;
  width: 50%;
  flex-direction: column;
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
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 10px;
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
`;

const DescriptionInput = styled.textarea`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px; /* Increased margin-bottom for longer text box */
  resize: vertical;
`;

const CreateButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const ImageBoxUpload = styled.label`
  cursor: pointer;
`;

function Popup({ setOpenPopup }) {
  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleImageUpload = (event) => {
    // Handle the image upload logic here
    const file = event.target.files[0];
    // Process the uploaded file as needed
  };

  return (
    <PopupBackground>
      <PopupContainer>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
        <ImageContainer>
          <ImageBoxUpload htmlFor="image-upload">
            <ImageBox>Image Placeholder</ImageBox>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ImageBoxUpload>
        </ImageContainer>
        <ItemContainer>
          <Label>
            Name
            <Asterisk>*</Asterisk>
          </Label>
          <Input type="text" placeholder="Enter name" required />
          <Label>
            Category
            <Asterisk>*</Asterisk>
          </Label>
          <Select required>
            <option value="">Select category</option>
            <option value="clothing">Clothing</option>
            <option value="cars">Cars</option>
            <option value="miscellaneous">Miscellaneous</option>
          </Select>
          <Label>
            Description
            <Asterisk>*</Asterisk>
          </Label>
          <DescriptionInput placeholder="Enter description" required></DescriptionInput>
          <CreateButton>Create Post</CreateButton>
        </ItemContainer>
      </PopupContainer>
    </PopupBackground>
  );
}

export default Popup;
