import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {ImageUploader} from "../ImageCroper/ImageUploader.jsx";
import {InputFieldStyled, InputStyled, LabelStyled, TextareaAutosizeStyled} from "../InputStyled.js";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {SlideFormStyled} from "./styles.js";
import {
    NO_TEXT_IMG,
    TEXT_BOTTOM_IMG,
    TEXT_LEFT_IMG,
    TEXT_RIGHT_IMG,
    TEXT_TOP_IMG
} from "../../constants/staticImages.js";
import {TEMPLATES} from "../../constants/presentationTemplates.js";

export const CreateSlideForm = ({
                                    fields,
                                    setValue,
                                    slide = {},
                                    presentationId,
                                    saveSlide,
                                }) => {
    const {t} = useTranslation('tr');
    const [activeTemplate, setActiveTemplate] = useState('no-text');
    const setTemplate = async (template) => {
        setValue('template', template);
        setActiveTemplate(template);
        await saveSlide();
    }

    useEffect(() => {
        setActiveTemplate(slide?.template || 'no-text')
    }, [slide?.template])

    return (
        <SlideFormStyled>
            <div>
                <InputFieldStyled
                    className={clsx(fields[0].inputType, {'required': fields[0].required})}>
                    <LabelStyled>
                        {t(`slides.labels.${fields[0].name}`)}
                    </LabelStyled>
                    <InputStyled
                        value={slide.title}
                        onChange={async (e) => {
                            setValue('title', e.target.value)
                            await saveSlide();
                        }}
                        placeholder={t(`slides.placeholders.title`)}
                    />
                </InputFieldStyled>
                <InputFieldStyled
                    className={clsx(fields[1].inputType, {'required': fields[1].required})}>
                    <LabelStyled>
                        {t(`slides.labels.${fields[1].name}`)}
                    </LabelStyled>
                    <TextareaAutosizeStyled
                        value={slide?.content}
                        onChange={async (e) => {
                            setValue('content', e.target.value)
                            await saveSlide();
                        }}
                        placeholder={t(`slides.placeholders.${fields[1].name}`)}
                    />
                </InputFieldStyled>
            </div>
            <div className="right-side">
                <InputFieldStyled
                    className={clsx(fields[2].inputType, {'required': fields[2].required})}>
                    <LabelStyled>
                        {t(`slides.labels.${fields[2].name}`)}
                    </LabelStyled>
                    <ImageUploader
                        storageFolderName={presentationId}
                        placeholder={t(`slides.placeholders.${fields[2].name}`)}
                        size={(activeTemplate === TEMPLATES.TEXT_LEFT || activeTemplate === TEMPLATES.TEXT_RIGHT)
                            ? 1 : fields[2].size}
                        src={slide?.img}
                        onUpload={async (data) => {
                            setValue('img', data)
                            await saveSlide();
                        }}
                        onDelete={async (data) => {
                            setValue('img', data)
                            await saveSlide();
                        }}
                    />
                </InputFieldStyled>

                <div className="image-wrapper">
                    <img src={NO_TEXT_IMG} alt="no-text" onClick={() => setTemplate('no-text')}
                         className={clsx({active: activeTemplate === 'no-text'})}/>
                    <img src={TEXT_TOP_IMG} alt="text-top" onClick={() => setTemplate('text-top')}
                         className={clsx({active: activeTemplate === 'text-top'})}/>
                    <img src={TEXT_BOTTOM_IMG} alt="text-bottom" onClick={() => setTemplate('text-bottom')}
                         className={clsx({active: activeTemplate === 'text-bottom'})}/>
                    <img src={TEXT_LEFT_IMG} alt="text-left" onClick={() => setTemplate('text-left')}
                         className={clsx({active: activeTemplate === 'text-left'})}/>
                    <img src={TEXT_RIGHT_IMG} alt="text-right" onClick={() => setTemplate('text-right')}
                         className={clsx({active: activeTemplate === 'text-right'})}/>
                </div>
            </div>
        </SlideFormStyled>
    );
};

CreateSlideForm.propTypes = {
    defaultValues: PropTypes.object,
    slide: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
    }).isRequired,
    presentationId: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            inputType: PropTypes.string,
            required: PropTypes.bool,
            isIgnored: PropTypes.bool,
            size: PropTypes.number,
            entity: PropTypes.string,
        })
    ).isRequired,
    saveSlide: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
};