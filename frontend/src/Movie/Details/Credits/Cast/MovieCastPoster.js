import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MonitorToggleButton from 'Components/MonitorToggleButton';
import MovieHeadshot from 'Movie/MovieHeadshot';
import EditImportListModalConnector from 'Settings/ImportLists/ImportLists/EditImportListModalConnector';
import styles from '../MovieCreditPoster.css';

class MovieCastPoster extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasPosterError: false,
      isEditImportListModalOpen: false
    };
  }

  //
  // Listeners

  onEditImportListPress = () => {
    this.setState({ isEditImportListModalOpen: true });
  };

  onAddImportListPress = () => {
    this.props.onImportListSelect();
    this.setState({ isEditImportListModalOpen: true });
  };

  onEditImportListModalClose = () => {
    this.setState({ isEditImportListModalOpen: false });
  };

  onPosterLoad = () => {
    if (this.state.hasPosterError) {
      this.setState({ hasPosterError: false });
    }
  };

  onPosterLoadError = () => {
    if (!this.state.hasPosterError) {
      this.setState({ hasPosterError: true });
    }
  };

  //
  // Render

  render() {
    const {
      performer,
      character,
      posterWidth,
      posterHeight,
      importList,
      safeForWorkMode
    } = this.props;

    const {
      hasPosterError
    } = this.state;

    const elementStyle = {
      width: `${posterWidth}px`,
      height: `${posterHeight}px`,
      borderRadius: '5px'
    };

    const contentStyle = {
      width: `${posterWidth}px`
    };

    const monitored = importList !== undefined && importList.enabled && importList.enableAuto;
    const importListId = importList ? importList.id : 0;

    return (
      <div
        className={styles.content}
        style={contentStyle}
      >
        <div className={styles.posterContainer}>
          <div className={styles.controls}>
            <MonitorToggleButton
              className={styles.action}
              monitored={monitored}
              size={20}
              onPress={importListId > 0 ? this.onEditImportListPress : this.onAddImportListPress}
            />
          </div>

          <div
            style={elementStyle}
          >
            <MovieHeadshot
              blur={safeForWorkMode}
              className={styles.poster}
              style={elementStyle}
              images={performer.images}
              size={250}
              lazy={false}
              overflow={true}
              onError={this.onPosterLoadError}
              onLoad={this.onPosterLoad}
            />

            {
              hasPosterError &&
                <div className={styles.overlayTitle}>
                  {performer.name}
                </div>
            }
          </div>
        </div>

        <div className={styles.title}>
          {performer.name}
        </div>
        <div className={styles.title}>
          {character}
        </div>

        <EditImportListModalConnector
          id={importListId}
          isOpen={this.state.isEditImportListModalOpen}
          onModalClose={this.onEditImportListModalClose}
          onDeleteImportListPress={this.onDeleteImportListPress}
        />
      </div>
    );
  }
}

MovieCastPoster.propTypes = {
  performer: PropTypes.object.isRequired,
  character: PropTypes.string,
  posterWidth: PropTypes.number.isRequired,
  posterHeight: PropTypes.number.isRequired,
  importList: PropTypes.object,
  safeForWorkMode: PropTypes.bool.isRequired,
  onImportListSelect: PropTypes.func.isRequired
};

export default MovieCastPoster;
