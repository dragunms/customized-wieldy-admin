import React from 'react';
import {Form} from 'antd';

const AvForm = ({
    validates = {},
    form,
    children,
    formItemLayout,
    defaultValues = {},
    onChange,
    layout = 'vertical',
    onSubmit,
}) => {
    function handleOnChange(changedFields, allFields) {
        if (onChange) {
            onChange(changedFields, allFields);
        }
    }

    return (
        <Form
            initialValues={defaultValues}
            className='av-form'
            form={form}
            onFinish={onSubmit}
            onValuesChange={(changedFields, allFields) => {
                handleOnChange(changedFields, allFields);
            }}
            defaultValue={defaultValues}
            layout={layout}
            {...formItemLayout}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const newProps = {
                        defaultValue: defaultValues[child.props.name],
                        rules: validates[child.props.name],
                        control: form,
                    };
                    return React.cloneElement(child, newProps);
                }
                return child;
            })}
        </Form>
    );
};

export default AvForm;
