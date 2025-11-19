import { ConfigProvider, Input, Table, Tag } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { useGetVendorsQuery } from '../../../redux/apiSlices/customerSlice';
import type { ICustomer } from '../../../types/types';

export default function Vendors({ dashboard }: { dashboard?: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); // Default page size

    const query = {
        page,
        limit,
        searchTerm,
    };

    const { data, isFetching } = useGetVendorsQuery(query as {});
    const filteredVendors: ICustomer[] = data?.data ?? [];
    const pagination = data?.pagination;

    const columns = [
        {
            title: 'SL',
            key: 'serial',
            render: (_: unknown, __: ICustomer, index: number) => (page - 1) * limit + index + 1,
            width: 60,
        },
        {
            title: 'Vendor Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Vendor Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            responsive: ['md'] as any,
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            render: (verified: boolean) => (
                <Tag color={verified ? 'green' : 'volcano'}>{verified ? 'Verified' : 'Pending'}</Tag>
            ),
        },
        {
            title: 'Subscription',
            dataIndex: 'subscribe',
            key: 'subscribe',
            render: (subscribe: boolean) => (
                <Tag color={subscribe ? 'blue' : 'default'}>{subscribe ? 'Subscribed' : 'Free'}</Tag>
            ),
        },
        {
            title: 'Joined',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) => new Date(value).toLocaleDateString(),
            responsive: ['sm'] as any,
        },
    ];

    // Handle table change (pagination, filters, sorter)
    const handleTableChange = (paginationConfig: any) => {
        if (paginationConfig.current !== page) setPage(paginationConfig.current);
        if (paginationConfig.pageSize !== limit) setLimit(paginationConfig.pageSize);
    };

    // Reset page to 1 on searchTerm change
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <HeaderTitle title="Vendors" />
                <Input
                    placeholder="Search by name, email or phone"
                    style={{ width: 280, height: 40 }}
                    prefix={<i className="bi bi-search"></i>}
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#C8A284',
                    },
                }}
            >
                <Table
                    columns={columns}
                    dataSource={filteredVendors}
                    loading={isFetching}
                    pagination={
                        dashboard
                            ? false
                            : {
                                pageSize: pagination?.limit || limit,
                                total: pagination?.total || 0,
                                current: pagination?.page || page,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '20', '50'],
                                showQuickJumper: true,
                            }
                    }
                    onChange={dashboard ? undefined : handleTableChange}
                    rowKey="_id"
                    className="custom-table"
                />
            </ConfigProvider>
        </div>
    );
}
