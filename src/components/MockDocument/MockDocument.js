import React from "react";
import { Image, Card } from "semantic-ui-react";
import "./MockDocument.css";

const MockDocument = props => {
  return (
    <div className="mockdocument">
      <Image
        src="./mockdocument.png"
        as="a"
        size="tiny"
        href="http://google.com"
        target="_blank"
        wrapped
      />
      <p className="mockdocument-title">
        {props.title}
      </p>
    </div >
  );
};

export default MockDocument;
