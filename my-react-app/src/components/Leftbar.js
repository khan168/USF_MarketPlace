import React, { useRef, useState, useEffect } from "react";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import SpeakerIcon from "@mui/icons-material/Speaker";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import styled from "styled-components";
import axios from "axios";

const Left = styled.div`
  padding: 15px;
  width:7vw;
  background-color: rgb(207, 196, 147);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    width: 16vw;
    position: sticky;
    height: 100vh;
    overflow-y: auto;
  }
`;



const IconsPanel = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px 5px 5px 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  -webkit-appearance: none;
`;

const Leftbar = ({ setError, setList, setLoading }) => {
  const SERVER = process.env.REACT_APP_SERVER;
  const [sort, setSort] = useState("");
  const [cat, setCat] = useState("");
  const minRef = useRef();
  const maxRef = useRef();

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}&sort=${sort}`
        )
        .then((response) => {
          setList(response.data);
          setLoading(false);
        })
        .catch((error) => setError(error.message));
    };

    fetchdata();
  }, [cat, sort, SERVER, setError, setList, setLoading]);

  const HandleClickClothes = () => {
    minRef.current.value = null; //to reset the min max and not sort with both query
    maxRef.current.value = null;
    setCat("Clothing");
  };

  const HandleClickFur = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Furniture");
  };

  const HandleClickE = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Electronics");
  };

  const HandleClickMis = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Miscellaneous"); //could be spelt wrong
  };
  const HandleClickRestart = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("");
  };
  const HandleClickAuto = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Auto");
  };

  const HandleClickLease = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Lease/subleases");
  };

  const HandleClickSellingServices = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Selling Services");
  };

  const HandleClickBook = () => {
    minRef.current.value = null;
    maxRef.current.value = null;
    setCat("Book");
  };

  const HandleFilter = async () => {
    setLoading(true);
    setCat("");
    await axios
      .get(
        `${SERVER}api/items/?min=${minRef.current.value}&max=${maxRef.current.value}&cat=${cat}&sort=${sort}`
      )
      .then((response) => {
        setList(response.data);
        setLoading(false);
      });
  };

  const HandleSelect = (event) => {
    const { value } = event.target;
    setSort(value);
  };
  return (
    <Left>
      <Filter>
        <span
          style={{
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Price
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <input
            style={{
              padding: "5px",
              marginBottom: "5px",
              width: "50%",
              borderWidth: "0.5px",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            ref={minRef}
            type="number"
            placeholder="min"
          />
          {/* <p style={{fontWeight: "bold",}}> to </p> */}
          <input
            style={{
              padding: "5px",
              marginBottom: "5px",
              width: "50%",
              borderWidth: "0.5px",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
            ref={maxRef}
            type="number"
            placeholder="max"
          />
        </div>
        <button
          onClick={HandleFilter}
          style={{
            padding: "5px",
            backgroundColor: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Apply
        </button>
      </Filter>
      <Select name="category" onChange={HandleSelect} required>
        <option value="">Sort</option>
        <option value="pricel">Price: Low to High</option>
        <option value="priceh">Price: High to Low</option>
        <option value="createdAt">Latest Posting</option>
      </Select>
      <IconsPanel>
        <RestartAltIcon
          fontSize="large"
          category="Miscellaneous"
          onClick={HandleClickRestart}
          style={{ marginBottom: "60px", marginTop: "50px" }}
        ></RestartAltIcon>
        <div onClick={HandleClickClothes}>Clothing</div>
        <CheckroomIcon
          fontSize="large"
          category="Clothing"
          onClick={HandleClickClothes}
          value="Clothing"
          style={{ marginBottom: "60px" }}
        ></CheckroomIcon>
        <div onClick={HandleClickFur}>Furniture</div>
        <ChairIcon
          fontSize="large"
          category="Furniture"
          onClick={HandleClickFur}
          value="Furniture"
          style={{ marginBottom: "60px" }}
        ></ChairIcon>
        <div onClick={HandleClickE}>Electornics</div>
        <SpeakerIcon
          fontSize="large"
          category="Electronics"
          onClick={HandleClickE}
          style={{ marginBottom: "60px" }}
        ></SpeakerIcon>
        <div onClick={HandleClickAuto}>Auto</div>
        <DriveEtaIcon
          fontSize="large"
          onClick={HandleClickAuto}
          style={{ marginBottom: "60px" }}
        ></DriveEtaIcon>
        <div onClick={HandleClickLease}>Leases</div>
        <HomeIcon
          fontSize="large"
          onClick={HandleClickLease}
          style={{ marginBottom: "60px" }}
        ></HomeIcon>
        <div onClick={HandleClickBook}>Book</div>
        <BookIcon
          fontSize="large"
          onClick={HandleClickBook}
          style={{ marginBottom: "60px" }}
        ></BookIcon>
        <div onClick={HandleClickSellingServices}>Selling Services</div>
        <DesignServicesIcon
          fontSize="large"
          onClick={HandleClickSellingServices}
          style={{ marginBottom: "60px" }}
        ></DesignServicesIcon>
        <div onClick={HandleClickMis}>Miscellaneous</div>
        <MoreHorizIcon
          fontSize="large"
          onClick={HandleClickMis}
          style={{ marginBottom: "60px" }}
        ></MoreHorizIcon>
      </IconsPanel>
    </Left>
  );
};


export default Leftbar;
