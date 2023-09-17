import { Form, Input, Modal, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React from 'react'

const ModalDelete = ({ isModalOpen, handleOk, handleCancel, form }) => {
    return (
        <Modal 
            title="Delete User" 
            open={isModalOpen}
            onCancel={() => handleCancel(current => !current)}
            footer={[]}
            centered
        >
            <p className='mb-6'>Apakah anda yakin ingin menghapus user ini?</p>
            <div className='flex justify-end'>
                <button type="button" onClick={() => { handleCancel(current => !current); }} className="py-[8px] px-[12px] rounded-lg bg-[#909090] text-white mr-2">Cancel</button>
                <button onClick={handleOk} className="py-[8px] px-[12px] rounded-lg bg-[#FD5D5D] text-white">Delete</button>
            </div>
        </Modal>
    )
}

export default ModalDelete;