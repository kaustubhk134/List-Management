import { Formik } from "formik";
import { Input, Button, message, Space } from "antd";
import { listValidationSchema } from "../utils/validationSchema";
import api from "../services/api";

const { TextArea } = Input;

const ListForm = ({
    fetchLists,
    editingRecord,
    setEditingRecord,
    }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">

        <Formik
            initialValues={{
            title: editingRecord?.title || "",
            description: editingRecord?.description || "",
            }}
            enableReinitialize={true}
            validationSchema={listValidationSchema}
            onSubmit={async (values, { resetForm }) => {

                try {
                    if (editingRecord) {
                        await api.put(
                            `/list/${editingRecord.id}`,
                            values
                        );
                        message.success("List updated successfully");

                    } else {
                        await api.post("/list", values);
                        message.success("List created successfully");
                    }

                    await fetchLists();
                    resetForm();
                    setEditingRecord(null);

                } catch (error) {
                    console.log(error);
                    message.error("Something went wrong");
                }
            }}
            >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            }) => (

            <form onSubmit={handleSubmit}>

                <div className="mb-4">

                <label className="font-medium">
                    Title
                </label>

                <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter title"
                />

                {touched.title && errors.title && (
                    <p className="text-red-500 mt-1">
                    {errors.title}
                    </p>
                )}

                </div>

                <div className="mb-4">

                <label className="font-medium">
                    Description
                </label>

                <TextArea
                    rows={4}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter description"
                />

                {touched.description && errors.description && (
                    <p className="text-red-500 mt-1">
                    {errors.description}
                    </p>
                )}

                </div>

                {/* <Button
                htmlType="submit"
                type="primary"
                >
                Save
                </Button> */}

                {/* <Button
                    type="primary"
                    htmlType="submit"
                >
                    {editingRecord ? "Update" : "Save"}
                </Button> */}
                <Space>

                <Button
                    type="primary"
                    htmlType="submit"
                >
                    {editingRecord ? "Update" : "Save"}
                </Button>

                    {editingRecord && (
                        <Button
                            onClick={() => {
                                setEditingRecord(null);
                            }}
                        >
                            Cancel
                        </Button>
                    )}

                </Space>

            </form>

            )}
        </Formik>

        </div>
    );
};

export default ListForm;