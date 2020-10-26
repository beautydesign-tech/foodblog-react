import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Fade, Stagger } from "react-animation-components";
import { baseUrl } from "../shared/baseUrl";

function RenderPartner({ partner }) {
  if (partner) {
    return (
      <React.Fragment>
        <Media
          object={true}
          width="150"
          src={baseUrl + partner.image}
          alt={partner.name}
        />
        <Media body={true} className="ml-5 mb-4">
          {" "}
          <Media heading={true}></Media> {partner.name}{" "}
        </Media>
      </React.Fragment>
    );
  }
  return <div />;
}

function PartnerList(props) {
  const partners = props.partners.partners.map((partner) => {
    return (
      <Fade in key={partner.id}>
        <Media tag="li">
          <RenderPartner partner={partner} />
        </Media>
      </Fade>
    );
  });
  if (props.partners.isLoading) {
    return <Loading />;
  }
  if (props.partners.errMess) {
    return (
      <div className="col">
        <h4>{props.partners.errMess}</h4>
      </div>
    );
  }
  return (
    <div className="col mt-4">
      <Media list>
        <Stagger in>{partners}</Stagger>
      </Media>
    </div>
  );
}

function About(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Our Story</BreadcrumbItem>
          </Breadcrumb>
          <h2>Our Story</h2>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-sm-6">
          <h3>Our Goal</h3>
          <p>
            Our goal is to provide meaningful resources for all people.
            Interesting new resources for the esperienced cook, as well as fresh
            and graspable insights for those new to the cooking world. We always
            reference our partners and friends because we believe in giving
            credit where credit is due. Nothing you see here has been influenced
            by pay or free products. We have a core value of sharing with our
            family and friends (That's you!!) what we would recommend genuinely
            from the heart! Cooking takes on its own rhythm and can help foster
            many skills in the young and the old. Join us on this journey of
            growing in knowledge!
          </p>
        </div>
        <div className="col-sm-6">
          <Card>
            <CardHeader className="bg-primary text-white">
              <h3>Core Values</h3>
            </CardHeader>
            <CardBody>
              <dl className="row">
                <dt className="col-6">Heart</dt>
                <dd className="col-6">Trust</dd>
                <dt className="col-6">Mind</dt>
                <dd className="col-6">Dedication</dd>
                <dt className="col-6">Soul</dt>
                <dd className="col-6">Creativity</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col">
          <Card className="bg-light mt-3">
            <CardBody>
              <blockquote className="blockquote">
                <p className="mb-0">Cooking is about surrender.</p>
                <footer className="blockquote-footer">
                  Tembi Locke,{" "}
                  <cite title="Source Title">
                    "From Scratch: A Memoir of Love, Sicily, and Finding Home"
                    2020
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Our Community</h3>
        </div>
        <div className="col mt-4">
          <Media list>
            <PartnerList partners={props.partners} />
          </Media>
        </div>
      </div>
    </div>
  );
}

export default About;
