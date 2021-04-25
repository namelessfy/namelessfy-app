import React from "react";
import { func } from "prop-types";
import { useDropzone } from "react-dropzone";

import { Background, Container, Aside } from "./style";

function Dropzone({ onFileSelected }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "audio/*",
    maxFiles: 1,
    onDropAccepted: onFileSelected,
  });
  // eslint-disable-next-line no-unused-vars
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div>
      <Background>
        <Container {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </Container>
      </Background>
      <Aside>
        <ul>{files}</ul>
      </Aside>
    </div>
  );
}

Dropzone.propTypes = {
  onFileSelected: func,
};

Dropzone.defaultProps = {
  onFileSelected: (_) => {},
};

export default Dropzone;
