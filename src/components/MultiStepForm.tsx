import React, { useState, useMemo } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

interface FieldOption {
    label: string;
    value: string;
}

interface FieldData {
    type: 'textfield' | 'textarea' | 'radio' | 'autocomplete';
    label: string;
    placeholder: string;
    required: boolean;
    options?: FieldOption[] | string[];
}

interface Step {
    step: number;
    title: string;
    description: string;
    fields: FieldData[];
}

const stepsData: Step[] = [
    {
        step: 1,
        title: "Personal Information",
        description: "Please fill out your personal information",
        fields: [
            {
                type: "textfield",
                label: "Name",
                placeholder: "Enter your name",
                required: true
            },
            {
                type: "radio",
                label: "Gender",
                options: [
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" }
                ],
                placeholder: "",
                required: true
            }
        ]
    },
    {
        step: 2,
        title: "Additional Information",
        description: "Please provide additional details",
        fields: [
            {
                type: "textarea",
                label: "Description",
                placeholder: "Enter a description",
                required: true
            },
            {
                type: "autocomplete",
                label: "Title",
                placeholder: "Enter a title",
                options: ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."],
                required: true
            }
        ]
    }
];

const getInitialValues = (step: Step, allValues: Record<string, any>) => {
    const values: Record<string, any> = {};
    step.fields.forEach(field => {
        values[field.label.toLowerCase()] = allValues[field.label.toLowerCase()] || '';
    });
    return values;
};

const getValidationSchema = (step: Step) => {
    const shape: Record<string, any> = {};
    step.fields.forEach(field => {
        if (field.required) {
            shape[field.label.toLowerCase()] = Yup.string().required(`${field.label} is required`);
        } else {
            shape[field.label.toLowerCase()] = Yup.string();
        }
    });
    return Yup.object().shape(shape);
};

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [allValues, setAllValues] = useState<Record<string, any>>({});

    const currentStepData = stepsData.find(step => step.step === currentStep);

    const initialValues = useMemo(() => {
        if (currentStepData) {
            return getInitialValues(currentStepData, allValues);
        }
        return {};
    }, [currentStepData, allValues]);

    const validationSchema = useMemo(() => {
        if (currentStepData) {
            return getValidationSchema(currentStepData);
        }
        return Yup.object();
    }, [currentStepData]);

    const handleSubmit = async (values: Record<string, any>, actions: FormikHelpers<any>) => {
        console.log('Form values:', { ...allValues, ...values });
        alert('Form values:' + JSON.stringify({ ...allValues, ...values }));
        actions.setSubmitting(false);
    };

    const handleNext = async (formik: FormikProps<any>) => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            setAllValues(prevValues => ({
                ...prevValues,
                ...formik.values
            }));
            setCurrentStep(currentStep + 1);
        } else {
            formik.setTouched(
                Object.keys(errors).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {} as any)
            );
            formik.setErrors(errors);
        }
    };

    const handlePrevious = (formik: FormikProps<any>) => {
        setAllValues(prevValues => ({
            ...prevValues,
            ...formik.values
        }));
        setCurrentStep(currentStep - 1);
    };

    return (
        <div>
            <div className='card bg-base-100 border shadow-xl p-10'>
                <ul className="steps steps-vertical lg:steps-horizontal mb-6">
                    {stepsData.map(step => (
                        <li key={step.step} className={`step ${step.step < currentStep ? 'step-primary' : (step.step === currentStep ? 'step-primary' : '')}`}>
                            {step.title}
                        </li>
                    ))}
                </ul>

                {stepsData.map(step => (
                    <div
                        key={step.step}
                        className={`transition-opacity duration-300 ease-in-out transform ${step.step === currentStep ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
                            }`}
                    >
                        {currentStep === step.step && (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validateOnChange={true}
                                validateOnBlur={true}
                            >
                                {formik => (
                                    <Form>
                                        <h2 className="text-xl font-bold mb-2">{step.title}</h2>
                                        <p className="mb-4">{step.description}</p>

                                        {step.fields.map((field, index) => (
                                            <div key={index} className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-3">{field.label}</label>
                                                {field.type === 'textfield' && (
                                                    <Field
                                                        name={field.label.toLowerCase()}
                                                        placeholder={field.placeholder}
                                                        className="input input-bordered w-full"
                                                    />
                                                )}
                                                {field.type === 'textarea' && (
                                                    <Field
                                                        as="textarea"
                                                        name={field.label.toLowerCase()}
                                                        placeholder={field.placeholder}
                                                        className="textarea textarea-bordered w-full"
                                                    />
                                                )}
                                                {field.type === 'radio' && (
                                                    <div>
                                                        {field.options?.map((option, idx) => (
                                                            <label key={idx} className="inline-flex items-center mr-4">
                                                                <Field
                                                                    type="radio"
                                                                    name={field.label.toLowerCase()}
                                                                    value={(option as FieldOption).value}
                                                                    className="form-radio"
                                                                />
                                                                <span className="ml-2">{(option as FieldOption).label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                                {field.type === 'autocomplete' && (
                                                    <Field as="select" name={field.label.toLowerCase()} className="select select-bordered w-full">
                                                        <option value="">Choose {field.label} :</option>
                                                        {(field.options as string[]).map((option, idx) => (
                                                            <option key={idx} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                )}
                                                <ErrorMessage name={field.label.toLowerCase()} component="div" className="text-red-600 text-sm" />
                                            </div>
                                        ))}

                                        <div className="flex justify-between">
                                            {currentStep > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handlePrevious(formik)}
                                                    className="btn btn-neutral"
                                                >
                                                    Previous
                                                </button>
                                            )}
                                            {currentStep < stepsData.length ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleNext(formik)}
                                                    className="btn btn-primary"
                                                >
                                                    Next
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="btn btn-success text-white"
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiStepForm;
