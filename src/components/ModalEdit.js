import React from 'react';
import { Form, Input, Modal, Select } from 'antd';

const ModalEdit = ({ isModalOpen, handleOk, handleCancel, form }) => {
    // const [form] = useForm();

    return (
        <Modal 
            title="Edit User" 
            open={isModalOpen}
            onCancel={() => handleCancel(current => !current)}
            footer={[]}
            centered
        >
            <Form
                layout='vertical'
                autoComplete="off"
                onFinish={handleOk}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    className="mt-4"
                    rules={[
                        {
                            required: true,
                            message: "Name field is required"
                        }
                    ]}
                >
                    <Input placeholder="Ex. Darma wijaya" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email'
                        },
                        {
                            required: true,
                            message: "Email field is required"
                        }
                    ]}
                >
                    <Input placeholder="Ex. darma@mail.com" type="email" />
                </Form.Item>
                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Gender field is required"
                        }
                    ]}
                >
                    <Select placeholder="Select gender">
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Status field is required"
                        }
                    ]}
                >
                    <Select placeholder="Select status">
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                    </Select>
                </Form.Item>
                <div className='flex justify-end'>
                    <button type="button" onClick={() => { handleCancel(current => !current); form.resetFields() }} className="py-[8px] px-[12px] rounded-lg bg-[#FD5D5D] text-white mr-2">Cancel</button>
                    <button type="submit" className="py-[8px] px-[12px] rounded-lg bg-[#34BE82] text-white">Simpan</button>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalEdit;