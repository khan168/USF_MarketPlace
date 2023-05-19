import React, { useState } from 'react'
import upload from '../utilities/Upload';


/*

Title: Spliing the tea on what i wrote below

Body: Basically this code uses the html input files to accept mutliple files
      Each file uploaded is given to the Upload.js which returns a link 
      then all files are stored in the setLink


*/




const AddImage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // new loading state
    const [links, setLinks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log('No file selected');
            return;
        }

        setLoading(true); // begin loading

        const url = await upload(file);
        if (url) {
            setLinks([...links, url]); // add the new link to the array
        }

        setLoading(false); // finish loading

        // try {
        //     await newRequest.post("/auth/register", {
        //         ...user,
        //         img: url,
        //     });
        //     navigate("/")
        // } catch (err) {
        //     console.log(err);
        // }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }


  return (
    <>
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="file" onChange={handleFileChange} style={styles.input} />
      <input type="submit" value="Upload Image" style={styles.input} />
    </form>

    {/* Loading indicator */}
    {loading && <p>Uploading image...</p>}

    <div>
        {/* Map over the links and display them */}
        {links.map((link, index) => (
            <img key={index} src={link} alt="Uploaded" />
        ))}
    </div>
    </>
  );
}


const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      margin: '0 auto',
    },
    input: {
      margin: '10px 0',
    }
  };

export default AddImage
