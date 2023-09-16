'use client'

import HeaderPage from '@/components/header'
import { fetchUsers } from '@/store/slices/usersSlice';
import { Table } from 'antd'
import React, { useEffect } from 'react'
import { Plus } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 300,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: () => {
        return (
            <div className='flex gap-2'>
                <button className='rounded-[6px] py-[8px] px-[12px] bg-[#FFB72B] text-white'>EDIT</button>
                <button className='rounded-[6px] py-[8px] px-[12px] bg-[#FD5D5D] text-white'>DELETE</button>
            </div>
        )
      }
    },
];

const UserList = () => {

    const dispatch = useDispatch();
    const { dataUsers } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])
    

    console.log(dataUsers);

    return (
        <div className="max-w-screen-xl w-screen m-auto px-10">
            <HeaderPage />
            <div className='flex items-center justify-between'>
                <h1 className='text-[40px] my-10' >List User</h1>
                <button className='flex rounded-[6px] items-center bg-[#34BE82] h-[42px] text-white gap-2 py-[8px] px-[12px]'>
                    <Plus />
                    <span>Tambah User</span>
                </button>
            </div>
            <div className="w-full">
                <Table
                    columns={columns}
                    dataSource={dataUsers}
                    scroll={{ x: true }}
                />
            </div>
        </div>
    )
}

export default UserList