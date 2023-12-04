import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import Button from 'Components/Link/Button';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { inputTypes } from 'Helpers/Props';
import { setMoviePosterOption } from 'Store/Actions/movieIndexActions';
import translate from 'Utilities/String/translate';
import selectPosterOptions from '../selectPosterOptions';

const posterSizeOptions = [
  {
    key: 'small',
    get value() {
      return translate('Small');
    },
  },
  {
    key: 'medium',
    get value() {
      return translate('Medium');
    },
  },
  {
    key: 'large',
    get value() {
      return translate('Large');
    },
  },
];

interface MovieIndexPosterOptionsModalContentProps {
  onModalClose(...args: unknown[]): unknown;
}

function MovieIndexPosterOptionsModalContent(
  props: MovieIndexPosterOptionsModalContentProps
) {
  const { onModalClose } = props;

  const posterOptions = useSelector(selectPosterOptions);

  const {
    detailedProgressBar,
    size,
    showTitle,
    showMonitored,
    showQualityProfile,
    showReleaseDate,
    showTmdbRating,
    showRottenTomatoesRating,
    showSearchAction,
  } = posterOptions;

  const dispatch = useDispatch();

  const onPosterOptionChange = useCallback(
    ({ name, value }: { name: string; value: unknown }) => {
      dispatch(setMoviePosterOption({ [name]: value }));
    },
    [dispatch]
  );

  return (
    <ModalContent onModalClose={onModalClose}>
      <ModalHeader>{translate('PosterOptions')}</ModalHeader>

      <ModalBody>
        <Form>
          <FormGroup>
            <FormLabel>{translate('PosterSize')}</FormLabel>

            <FormInputGroup
              type={inputTypes.SELECT}
              name="size"
              value={size}
              values={posterSizeOptions}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('DetailedProgressBar')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="detailedProgressBar"
              value={detailedProgressBar}
              helpText={translate('DetailedProgressBarHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowTitle')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showTitle"
              value={showTitle}
              helpText={translate('ShowTitleHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowMonitored')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showMonitored"
              value={showMonitored}
              helpText={translate('ShowMonitoredHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowQualityProfile')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showQualityProfile"
              value={showQualityProfile}
              helpText={translate('ShowQualityProfileHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowReleaseDate')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showReleaseDate"
              value={showReleaseDate}
              helpText={translate('ShowReleaseDateHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowTmdbRating')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showTmdbRating"
              value={showTmdbRating}
              helpText={translate('ShowTmdbRatingHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowRottenTomatoesRating')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showRottenTomatoesRating"
              value={showRottenTomatoesRating}
              helpText={translate('ShowRottenTomatoesRatingHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>{translate('ShowSearch')}</FormLabel>

            <FormInputGroup
              type={inputTypes.CHECK}
              name="showSearchAction"
              value={showSearchAction}
              helpText={translate('ShowSearchHelpText')}
              onChange={onPosterOptionChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button onPress={onModalClose}>{translate('Close')}</Button>
      </ModalFooter>
    </ModalContent>
  );
}

export default MovieIndexPosterOptionsModalContent;
