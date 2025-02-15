import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Checkbox, Radio, Col, Row } from 'antd';
import { resizeFile } from '../../utils/resizeFile';
import { LabelStyled, TextareaAutosizeStyled } from '../InputStyled';
import { ViewIcon } from '../../assets/ViewIcon.jsx';
import { ClosedViewIcon } from '../../assets/ClosedViewIcon';
import { AlbumIcon as AddToSlider } from '../../assets/AlbumIcon.jsx';
import { FolderIcon as NotAddToSlider } from '../../assets/FolderIcon.jsx';
import { ImageIcon } from '../../assets/ImageIcon.jsx';
import { UvDropzoneStyled, StyledDropzoneBody } from './styles';
import clsx from 'clsx';
import { ButtonIconStyled } from '../ButtonStyled';

import PropTypes from 'prop-types';

export const DropzoneField = ({ field, onChange }) => {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('100');
  const [hideElement, setHideElement] = useState(false);
  const [addToSlideShow, setAddToSlideShow] = useState(false);

  useEffect(() => {
    field.value && setImage(field.value);
    field.description && setDescription(field.description);
    field.size && setSize(field.size);
    field.hideElement && setHideElement(field.hideElement);
    field.addToSlideShow && setAddToSlideShow(field.addToSlideShow);
  }, []);

  const onDrop = async (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const getUri = resizeFile(file);
      getUri &&
        getUri.then((preview) => {
          setImage(preview);
        });
    });
  };

  useEffect(() => {
    image &&
      onChange({
        value: image,
        description,
        size,
        hideElement,
        addToSlideShow,
      });
  }, [image, description, size, hideElement, addToSlideShow]);

  const viewHandler = useCallback(() => {
    setHideElement((prev) => !prev);
  }, []);
  const slideShowHandler = useCallback(() => {
    setAddToSlideShow((prev) => !prev);
  }, []);
  return (
    <StyledDropzoneBody>
      <Row className="dz-row">
        <Col width={4}>
          <LabelStyled className="label">Зображення</LabelStyled>
          <Dropzone onDrop={onDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <UvDropzoneStyled>
                <div {...getRootProps()}>
                  <input {...getInputProps()} accept=".png,.jpg" />
                  {!image && (
                    <span className="accent">+ Додати зображення</span>
                  )}
                  {image && <img src={image} alt={image} />}
                </div>
              </UvDropzoneStyled>
            )}
          </Dropzone>
        </Col>
        <Col width={12}>
          <>
            <Row>
              <Col width={7}>
                <LabelStyled>Додаткові налаштування</LabelStyled>
                <Row>
                  <ButtonIconStyled
                    id={'viewButton'}
                    onClick={viewHandler}
                    className="print-hide">
                    {hideElement ? <ClosedViewIcon /> : <ViewIcon />}
                  </ButtonIconStyled>
                  <Checkbox
                    label={
                      hideElement
                        ? 'Відображати під час друку'
                        : 'Приховати під час друку'
                    }
                    onChange={(e, data) => setHideElement(data.checked)}
                    checked={hideElement}
                  />
                </Row>
                <Row>
                  <ButtonIconStyled
                    id={'sliderButton'}
                    onClick={slideShowHandler}
                    className="print-hide">
                    {addToSlideShow ? <NotAddToSlider /> : <AddToSlider />}
                  </ButtonIconStyled>
                  <Checkbox
                    label={
                      addToSlideShow
                        ? 'Не додавати до презентації'
                        : 'Додати до презентації'
                    }
                    onChange={(e, data) => setAddToSlideShow(data.checked)}
                    checked={addToSlideShow}
                  />
                </Row>
                <hr />
                <Row>
                  <LabelStyled>Ширина зображення на сторінці</LabelStyled>
                  <>
                    <Row className="size-box">
                      <Col width={4}>
                        <Radio
                          label={() => (
                            <div className={clsx({ active: size === '100' })}>
                              <ImageIcon />
                            </div>
                          )}
                          name="radioGroup"
                          value={'100'}
                          checked={size === '100'}
                          onChange={() => setSize('100')}
                        />
                        <LabelStyled>100%</LabelStyled>
                      </Col>
                      <Col width={3}>
                        <Radio
                          label={() => (
                            <div className={clsx({ active: size === '60' })}>
                              <ImageIcon />
                            </div>
                          )}
                          name="radioGroup"
                          value="60"
                          checked={size === '60'}
                          onChange={() => setSize('60')}
                        />
                        <LabelStyled>50%</LabelStyled>
                      </Col>
                      <Col width={2}>
                        <Radio
                          label={() => (
                            <div className={clsx({ active: size === '30' })}>
                              <ImageIcon />
                            </div>
                          )}
                          name="radioGroup"
                          value="30"
                          checked={size === '30'}
                          onChange={() => setSize('30')}
                        />
                        <LabelStyled>30%</LabelStyled>
                      </Col>
                    </Row>
                  </>
                </Row>
              </Col>
              <Col width={9}>
                <LabelStyled>Опис до зображення</LabelStyled>
                <TextareaAutosizeStyled
                  rows={9}
                  name="img-description"
                  placeholder="Додайте опис, якщо треба"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
          </>
        </Col>
      </Row>
    </StyledDropzoneBody>
  );
};

DropzoneField.propTypes = {
  field: PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    size: PropTypes.string,
    hideElement: PropTypes.bool,
    addToSlideShow: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
