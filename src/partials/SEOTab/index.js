import './styles.less';

import React from 'react';
import {Card, Row, Col, Divider} from 'antd';
import {withRouter} from 'react-router-dom';

import TranslationText from 'src/components/TranslationText';
import AvTextInput from 'src/components/Form/AvTextInput';
import AvSwitch from 'src/components/Form/AvSwitch';
import AvUpload from 'src/components/Form/AvUpload';

const SEOTab = ({formControl, data}) => {
    return (
        <>
            <Card className='gx-card seo-page-card' title={<TranslationText id='label.seo_tab' />}>
                <Row>
                    <Col md={24} xs={24}>
                        <AvSwitch
                            name='metadata_disable'
                            label='field.metadata_disable'
                            control={formControl}
                            type='horizontal'
                            defaultValue={data}
                            rules={[
                                {
                                    transform(values) {
                                        return !!values;
                                    },
                                    type: 'boolean',
                                    message: <TranslationText id='validate.metadata_disable_type' />,
                                },
                            ]}
                        />
                    </Col>
                    <Col md={24} xs={24}>
                        <AvUpload
                            maxFiles={1}
                            accept='.jpg'
                            type='image'
                            name='metadata_image_url'
                            label='field.metadata_image_url'
                            imageType={['image/jpeg']}
                            imageWidth={1200}
                            imageHeight={600}
                            maxFileSizes={5}
                            defaultValue={data}
                            control={formControl}
                            hidden={false}
                        />
                        <Divider />
                        <div>
                            <TranslationText id='label.accepted_image_size' values={{width: 1200, height: 600}} />
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card className='gx-card seo-page-card' title={<TranslationText id='label.seo_tab' />}>
                <Row>
                    <Col md={24} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='metadata_keywords'
                            label='field.metadata_keywords'
                            rules={[
                                {type: 'string', message: <TranslationText id='validate.metadata_keywords_type' />},
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText id='validate.metadata_keywords_min_length' values={{min: 0}} />
                                    ),
                                },
                                {
                                    max: 255,
                                    message: (
                                        <TranslationText
                                            id='validate.metadata_keywords_max_length'
                                            values={{max: 255}}
                                        />
                                    ),
                                },
                            ]}
                            maxLength={255}
                        />
                    </Col>
                    <Col md={12} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='metadata_title'
                            label='field.metadata_title'
                            rules={[
                                {type: 'string', message: <TranslationText id='validate.metadata_title_type' />},
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText id='validate.metadata_title_min_length' values={{min: 0}} />
                                    ),
                                },
                                {
                                    max: 255,
                                    message: (
                                        <TranslationText id='validate.metadata_title_max_length' values={{max: 255}} />
                                    ),
                                },
                            ]}
                            maxLength={255}
                        />
                        <AvTextInput
                            defaultValue={data}
                            name='metadata_title_og'
                            label='field.metadata_title_og'
                            rules={[
                                {type: 'string', message: <TranslationText id='validate.metadata_title_type' />},
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText id='validate.metadata_title_min_length' values={{min: 0}} />
                                    ),
                                },
                                {
                                    max: 255,
                                    message: (
                                        <TranslationText id='validate.metadata_title_max_length' values={{max: 255}} />
                                    ),
                                },
                            ]}
                            maxLength={255}
                        />
                    </Col>
                    <Col md={12} xs={24}>
                        <AvTextInput
                            defaultValue={data}
                            name='metadata_description'
                            label='field.metadata_description'
                            rules={[
                                {type: 'string', message: <TranslationText id='validate.metadata_description_type' />},
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText
                                            id='validate.metadata_description_min_length'
                                            values={{min: 0}}
                                        />
                                    ),
                                },
                                {
                                    max: 255,
                                    message: (
                                        <TranslationText
                                            id='validate.metadata_description_max_length'
                                            values={{max: 255}}
                                        />
                                    ),
                                },
                            ]}
                            maxLength={255}
                        />
                        <AvTextInput
                            defaultValue={data}
                            name='metadata_description_og'
                            label='field.metadata_description_og'
                            rules={[
                                {type: 'string', message: <TranslationText id='validate.metadata_description_type' />},
                                {
                                    min: 0,
                                    message: (
                                        <TranslationText
                                            id='validate.metadata_description_min_length'
                                            values={{min: 0}}
                                        />
                                    ),
                                },
                                {
                                    max: 255,
                                    message: (
                                        <TranslationText
                                            id='validate.metadata_description_max_length'
                                            values={{max: 255}}
                                        />
                                    ),
                                },
                            ]}
                            maxLength={255}
                        />
                    </Col>
                </Row>
            </Card>
        </>
    );
};
export default withRouter(SEOTab);
