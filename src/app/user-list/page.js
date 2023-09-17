'use client'

import React, { useEffect, useState } from 'react'
import { Input, Table } from 'antd'
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import { Plus, Search } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import ModalCreate from '@/components/ModalCreate';
import ModalDelete from '@/components/ModalDelete';
import ModalEdit from '@/components/ModalEdit';
import HeaderPage from '@/components/header'
import { createUser } from '@/store/slices/createUserSlice';
import { deleteUser } from '@/store/slices/deleteUserSlice';
import { editUser } from '@/store/slices/editUserSlice';
import { fetchUsers } from '@/store/slices/usersSlice';
import LoadingAnimate from '../../assets/icons/loading-animate.svg';

const columns = (actionBtnEdit, actionBtnDelete) => [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 300,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 300,
      render: (gender) => <span className="capitalize">{gender}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 300,
      render: (status) => 
        status === 'active' ? (
            <div className="px-[8px] py-[4px] bg-[#34BE82] w-fit rounded-md text-white">Active</div>
        ) : (
            <div className="px-[8px] py-[4px] bg-[#FF4444] w-fit rounded-md text-white">Inactive</div>
        )
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (action, data) => {
        return (
            <div className='flex gap-2'>
                <button onClick={() => actionBtnEdit(data)} className='rounded-[6px] py-[8px] px-[12px] bg-[#FFB72B] text-white'>EDIT</button>
                <button onClick={() => actionBtnDelete(data.id)} className='rounded-[6px] py-[8px] px-[12px] bg-[#FD5D5D] text-white'>DELETE</button>
            </div>
        )
      }
    },
];

const UserList = () => {
    const [dataTableUsers, setDataTableUsers] = useState([]);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalEditActive, setIsModalEditActive] = useState(false);
    const [isModalDeleteActive, setIsModalDeleteActive] = useState(false);
    const [idEdit, setIdEdit] = useState(null);
    const [idDelete, setIdDelete] = useState(null);
    const [valueSearch, setValueSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const { dataUsers, isLoading } = useSelector(state => state.users);
    const [form] = useForm();
    const [formEdit] = useForm();

    useEffect(() => {
        dispatch(fetchUsers());

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        setDataTableUsers(dataUsers);
    }, [dataUsers])
    
    
    const handleSubmit = (data) => {
        dispatch(createUser(data));

        setTimeout(() => {
            form.resetFields();
            setIsModalActive(false);
            dispatch(fetchUsers());
        }, 500);
    }

    const handleOpenModalEdit = (data) => {
        setIsModalEditActive(current => !current);

        setIdEdit(data.id);
        formEdit.setFieldsValue({
            name: data.name,
            gender: data.gender,
            status: data.status,
            email: data.email,
        })
    }

    const handleSubmitEdit = (data) => {
        const newData = {...data, id: idEdit}

        dispatch(editUser(newData));

        setTimeout(() => {
            formEdit.resetFields();
            setIsModalEditActive(false);
            dispatch(fetchUsers());
        }, 500);
    }

    const handleOpenModalDelete = (id) => {
        setIsModalDeleteActive(current => !current)
        setIdDelete(id);
    }
    
    const handleSubmitDelete = () => {
        dispatch(deleteUser(idDelete));

        setTimeout(() => {
            setIsModalDeleteActive(false);
            dispatch(fetchUsers());
        }, 500);
    }

    const filteredData = dataTableUsers?.filter(item => String(item.name).toLowerCase().startsWith(valueSearch.toLowerCase()));

    const handleChangeSearch = (e) => {
        setValueSearch(e.target.value);
    }

    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={LoadingAnimate} alt="loading" width={42} />
            </div>
        )
    } else {
        return (
            <div className="max-w-screen-xl w-screen m-auto px-10">
                <HeaderPage />
                <div className='flex items-center justify-between'>
                    <h1 className='text-[36px] my-10' >List User</h1>
                    <button onClick={() => setIsModalActive(current => !current)} className='flex rounded-[6px] items-center bg-[#34BE82] h-[38px] text-white gap-1 py-[8px] px-[10px]'>
                        <Plus size={20} />
                        <span>Tambah User</span>
                    </button>
                </div>
                <div className='mb-6'>
                    <Input onChange={handleChangeSearch} size="large" placeholder="Search by name" prefix={<Search size={18} className='mr-4' />} />
                </div>
                <div className="w-full">
                    <Table
                        columns={columns(handleOpenModalEdit, handleOpenModalDelete)}
                        dataSource={filteredData}
                        scroll={{ x: true }}
                    />
                </div>
                <ModalCreate isModalOpen={isModalActive} handleOk={handleSubmit} handleCancel={setIsModalActive} form={form} />
                <ModalEdit isModalOpen={isModalEditActive} handleOk={handleSubmitEdit} handleCancel={setIsModalEditActive} form={formEdit} />
                <ModalDelete isModalOpen={isModalDeleteActive} handleOk={handleSubmitDelete} handleCancel={setIsModalDeleteActive} />
            </div>
        )
    }
}

export default UserList