import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      author: "",
      type: "",
      isModalOpen: false,
      touched: {
        name: false,
        author: false,
        type: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.resourceId,
      values.name,
      values.author,
      values.type
    );
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" />
          Submit
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Share a Thought</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              {/* <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <Control.select
                  className="form-control"
                  model=".rating"
                  name="rating"
                  id="rating"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div> */}

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <Control.text
                  className="form-control"
                  model=".author"
                  name="author"
                  id="author"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="text">Comment</label>
                <Control.textarea
                  className="form-control"
                  rows="6"
                  model=".text"
                  name="text"
                  id="text"
                />
              </div>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderResource({ resource }) {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={baseUrl + resource.image} alt={resource.name} />
          <CardBody>
            <CardText>{resource.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, resourceId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {comments.map((comment) => {
            return (
              <Fade in key={comment.id}>
                <div>
                  <p>
                    {comment.text} <br />
                    -- {comment.author},
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </Fade>
            );
          })}
        </Stagger>
        <CommentForm resourceId={resourceId} postComment={postComment} />
      </div>
    );
  }
  return <div />;
}

function Library(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.resource) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.resource.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.resource.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderResource resource={props.resource} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            resourceId={props.resource.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}

export default Library;
