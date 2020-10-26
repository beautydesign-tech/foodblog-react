import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

function RenderDirectoryItem({ resource }) {
  return (
    <Card>
      <CardImg width="100%" src={resource.image} alt={resource.name} />
      <CardImgOverlay>
        <CardTitle>{resource.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

function Resources(props) {
  const directory = props.resouces.map((resource) => {
    return (
      <div key={resource.id} className="col-md-5 m-1">
        <RenderDirectoryItem resource={resource} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{directory}</div>
    </div>
  );
}

export default Resources;
