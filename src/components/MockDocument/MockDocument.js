import React from "react";
import { Image } from "semantic-ui-react";
import "./MockDocument.css";

const MockDocument = props => {
  return (
    <div className="mockdocument">
      <Image
        src="./mockdocument.png"
        as="a"
        size="small"
        href="http://google.com"
        target="_blank"
      />
      <p className="mockdocument-title">{props.title}</p>
    </div>
  );
};

export default MockDocument;
