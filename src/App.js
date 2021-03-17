import React, { useState, useEffect } from "react";
import { Layout, Container, BoxUpload, ImagePreview } from "./style";
import FolderIcon from "./assets/folder_icon_transparent.png";
import CloseIcon from "./assets/CloseIcon.svg";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import Animal from './dropdown_text';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function App() {
  const [image, setImage] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState("");
    const classes = useStyles()
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: '', lastName: '' },
  ]);

  useEffect(()=>{
    fetch('/api').then(
        response => response.json()).then(data => setInputFields(data))}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  firstName: '', lastName: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <Layout>
      <Container>
        <h2>Cat Detector</h2>
        <p>Preview of Uploaded Photo</p>
        <br />
        <br />
        <form className={classes.root} onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <TextField
              name="firstName"
              label="First Name"
              variant="filled"
              value={inputField.firstName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="filled"
              value={inputField.lastName}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
            </IconButton>
          </div>
        )) }
        <br />
        <br />
        <p className="Column2"> Types of animal in uploaded photo</p>
        <Animal/>

      </form>

        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: "#444" }}>Click to upload image</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>
        {isUploaded ? <h2>Type is {typeFile}</h2> : null}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >Submit</Button>

      </Container>
    </Layout>
  );
}

export default App;
