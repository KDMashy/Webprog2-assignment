import Button from "@/components/common/Button";
import CustomForm from "@/components/common/form/CustomForm";
import { CustomInput } from "@/components/common/form/CustomInput";
import Modal from "@/components/common/modal";
import { exampleValidation } from "@/validations";
import { Formik } from "formik";
import React, { useState, useEffect } from "react";

function Sandbox() {
  const [isOpen, setIsOpen] = useState(false); // needed for opening and closing modal/s

  const [exampleList, setExampleList] = useState([
    {
      id: 1,
      label: "asd",
      type: "sadge",
    },
    {
      id: 2,
      label: "sad",
      type: "sadge",
    },
    {
      id: 3,
      label: "jklasd",
      type: "sadge",
    },
    {
      id: 4,
      label: "dasdasd",
      type: "sadge",
    },
    {
      id: 5,
      label: "valami",
      type: "sadge",
    },
  ]);

  const initialValues = {
    example_name: "",
    example_number: 0,
  };

  useEffect(() => {
    console.log("Loaded in!");
  }, []); // runs on start

  useEffect(() => {
    console.log("State changed for isOpen", isOpen);
  }, [isOpen]); // runs when isOpen value changes

  const submit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col items-center">
      <h1>Examples</h1>
      <div className="flex flex-col items-center border-b-2 border-dark-300 mb-3">
        <h2 className="text-dark-300 font-semibold text-lg">Form</h2>
        <div>
          <Formik // component for creating forms asily
            validationSchema={exampleValidation} // validation schema for values
            initialValues={initialValues} // values to pass
            onSubmit={(values) => submit(values)} // what to do if has no validation error
          >
            {({
              handleChange, // () => handleChange("value")
              handleSubmit, // onSubmit fire event
              errors, // array of errors if validation has some
              values, // array of initial values we have
              setFieldValue, // set value by hand () => setFieldValue("value", value)
              setFieldTouched, // if clicked or started writing in component
              touched, // was ever touched like abowe
            }) => {
              return (
                <CustomForm
                  className="container grid grid-cols-6 grid-rows-2 gap-9"
                  handleSubmit={() => handleSubmit()} // send on enter
                >
                  <div className="col-span-4 row-start-1">
                    <CustomInput
                      label="Example Name"
                      value={values?.example_name}
                      onChange={(e) => {
                        setFieldValue("example_name", e?.target?.value);
                        setFieldTouched("example_name", true);
                      }}
                      touched={touched?.example_name}
                      error={errors?.example_name}
                    />
                  </div>
                  <div className="col-span-2 row-start-1">
                    <CustomInput
                      label="Example Number"
                      value={values?.example_number}
                      onChange={(e) => {
                        setFieldValue("example_number", e?.target?.value);
                        setFieldTouched("example_number", true);
                      }}
                      error={errors?.example_number}
                      type={"number"}
                    />
                  </div>
                  <div className="col-span-6 row-start-2 mx-auto">
                    <Button
                      label="Submit example"
                      clickHandler={() => handleSubmit()}
                      clickType="submit"
                    />
                  </div>
                </CustomForm>
              );
            }}
          </Formik>
        </div>
      </div>
      <div>
        <h2 className="text-dark-300 font-semibold text-lg">Modal</h2>
        <div>
          <Button label="Open Modal" clickHandler={() => setIsOpen(true)} />
          <Modal
            isOpen={isOpen}
            onSetIsOpen={setIsOpen}
            closable // adds exit button
            content={
              <div>
                <h3>Example content in modal</h3>
              </div>
            }
          />
        </div>
      </div>
      <div className="bg-dark-300 mt-5 bg-opacity-30 p-3 rounded-md">
        <h2 className="text-dark-300 font-semibold text-lg">list examples</h2>
        <div>
          {exampleList && exampleList?.length > 0 ? (
            exampleList?.map(
              (
                item,
                index // mapping a list
              ) => (
                <div
                  key={`${index}-${item?.label}-fullist`}
                  className="mx-3 my-5 text-success-200"
                >
                  {item?.label}
                </div>
              )
            )
          ) : (
            <></>
          )}
        </div>
        <div>
          {exampleList && exampleList?.length > 0 ? (
            exampleList
              ?.filter((item) => item?.label === "valami")
              ?.map(
                (
                  item,
                  index // filtering a list
                ) => (
                  <div
                    key={`${index}-${item?.label}-filtered`}
                    className="mx-3 my-5 text-error-300"
                  >
                    {item?.label}
                  </div>
                )
              )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sandbox;
