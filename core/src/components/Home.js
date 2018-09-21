import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../store";
import styled from 'styled-components';

class Home extends React.Component {
    componentDidMount( ) {
        if ( this.props.circuits.length <= 0 ) {
            this.props.fetchData( );
        }
    }

    render( ) {
      const Container = styled.div`
        margin: 200px 0 0 15%;
        width: 70%;
      `
      const Header = styled.div`
        font-size: 100px;
      `
      const Content = styled.p`
        font-size: 25px;
        color: #767676;
      `

        return (
          <Container>
            <Header>{"I'm Glen"}</Header>
            <Content>Software engineer currently working @ <a className="thelabs" href="http://1904labs.com">1904Labs</a> in St. Louis, amatuer designer, Christ follower & Swiss American. You can check out my <a className="linkedin" href="https://www.linkedin.com/in/glenselle/">LinkedIn</a> or <a className="stackoverflow" href="https://stackoverflow.com/users/814747/glen-selle?tab=profile">Stackoverlow</a> profile or follow me on <a className="twitter" href="https://twitter.com/@glen_selle">Twitter</a>.</Content>
          </Container>
        );
    }
}
Home.serverFetch = fetchData; // static declaration of data requirements

const mapStateToProps = ( state ) => ( {
    circuits: state.data,
} );

const mapDispatchToProps = {
    fetchData,
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );
