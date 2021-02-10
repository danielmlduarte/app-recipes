import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Modal } from 'react-bootstrap';
import shareIcon from '../images/shareIcon.svg';

export default class CustomButtonShare extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleButtonModal = this.handleButtonModal.bind(this);
    this.state = {
      isShared: false,
    };
  }

  handleButtonClick() {
    const { url } = this.props;
    copy(`http://localhost:3000${url}`);
    this.setState({
      isShared: true,
    });
  }

  handleButtonModal() {
    this.setState({
      isShared: false,
    });
  }

  renderSharedText() {
    return (
      <div className="modal-text">
        <Modal.Dialog>
          <Modal.Body onClick={ () => this.handleButtonModal() }>
            <h3>Link copiado!</h3>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-dark"
              type="button"
              variant="secondary"
              onClick={ () => this.handleButtonModal() }
            >
              Fechar
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }

  render() {
    const { isShared } = this.state;
    const { testDone = false, index } = this.props;
    console.log(testDone);
    return (
      <div>
        {isShared && this.renderSharedText()}
        <button
          className="btn btn-light"
          type="button"
          data-testid={ !testDone ? 'share-btn' : `${index}-horizontal-share-btn` }
          onClick={ this.handleButtonClick }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="" />
        </button>
      </div>
    );
  }
}

CustomButtonShare.propTypes = {
  url: PropTypes.string.isRequired,
  testDone: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
