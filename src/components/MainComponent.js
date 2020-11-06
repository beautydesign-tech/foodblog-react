import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Contact from "./ContactComponent";
import Resources from "./ResourcesComponent";
import Library from "./ResourceLibrary";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import {
  postComment,
  fetchResources,
  fetchComments,
  fetchPromotions,
  fetchPartners,
  postFeedback,
} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// What I want to read
const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

// What I want to update through actions (dispatch)
const mapDispatchToProps = {
  postComment,
  fetchResources,
  resetFeedbackForm: () => actions.reset("feedbackForm"),
  fetchComments,
  fetchPromotions,
  fetchPartners,
  // postFeedback,
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchResources();
    this.props.fetchComments();
    this.props.fetchPromotions();
    this.props.fetchPartners();
  }

  render() {
    console.log(this.props);
    console.log(this.props.resources);
    const HomePage = () => {
      return (
        <Home
          resource={
            this.props.resources.resources.filter(
              (resource) => resource.featured
            )[0]
          }
          resourcesLoading={this.props.resources.isLoading}
          resourcesErrMess={this.props.resources.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={
            this.props.partners.partners.filter(
              (partner) => partner.featured
            )[0]
          }
          partnerLoading={this.props.partners.isLoading}
          partnerErrMess={this.props.partners.errMess}
        />
      );
    };

    const ResourceIdLibrary = ({ match }) => {
      return (
        <Library
          resource={
            this.props.resources.resources.filter(
              (resource) => resource.id === +match.params.resourceL
            )[0]
          }
          isLoading={this.props.resources.isLoading}
          errMess={this.props.resources.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.resourceL === +match.params.resourceL
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                render={() => <About partners={this.props.partners} />}
              />
              <Route
                exact
                path="/resources"
                render={() => <Resources resources={this.props.resources} />}
              />
              <Route
                path="/resources/:resourceL"
                component={ResourceIdLibrary}
              />
              <Route path="/contactus" component={Contact} />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
