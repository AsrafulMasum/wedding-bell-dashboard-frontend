import { ConfigProvider, Input, Table, Tag, Modal, Button } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { useGetSubscribersQuery } from '../../../redux/apiSlices/customerSlice';
import type { ISubscribers } from '../../../types/types';

export default function Subscribers({ dashboard }: { dashboard?: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10); // Default page size
    const [selectedSubscription, setSelectedSubscription] = useState<ISubscribers | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const query = {
        page,
        limit,
        searchTerm,
    };

    const { data, isFetching } = useGetSubscribersQuery(query as {});
    const filteredSubscriptions = data?.data ?? [];
    const pagination = data?.pagination;

    // Columns for the subscriptions table
    console.log({filteredSubscriptions})
    const columns = [
        {
            title: 'SL',
            key: 'serial',
            render: (_: unknown, __: ISubscribers, index: number) => (page - 1) * limit + index + 1,
            width: 60,
        },
        {
            title: 'Vendor Name',
            dataIndex: ['vendor', 'name'],
            key: 'vendorName',
            render: (_: any, record: ISubscribers) => record.vendor?.name || '-',
        },
        {
            title: 'Vendor Email',
            dataIndex: ['vendor', 'email'],
            key: 'vendorEmail',
            responsive: ['md'] as any,
            render: (_: any, record: ISubscribers) => record.vendor?.email || '-',
        },
        {
            title: 'Plan Title',
            key: 'planTitle',
            render: (_: any, record: ISubscribers) => record.plan?.title || '-',
        },
        {
            title: 'Plan Price',
            key: 'planPrice',
            render: (_: any, record: ISubscribers) => record.plan?.price ? `₹${record.plan.price}` : '-',
        },
        {
            title: 'Duration',
            key: 'planDuration',
            render: (_: any, record: ISubscribers) => record.plan?.duration || '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'volcano'}>
                    {status === 'active' ? 'Active' : 'Inactive'}
                </Tag>
            ),
        },
        {
            title: 'Start Date',
            dataIndex: 'currentPeriodStart',
            key: 'currentPeriodStart',
            render: (value: string) =>
                value ? new Date(value).toLocaleString() : '-',
        },
        {
            title: 'End Date',
            dataIndex: 'currentPeriodEnd',
            key: 'currentPeriodEnd',
            render: (value: string) =>
                value ? new Date(value).toLocaleString() : '-',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: ISubscribers) => (
                <Button size="small" type="link" onClick={() => { setSelectedSubscription(record); setModalOpen(true); }}>
                    View Details
                </Button>
            ),
        },
    ];

    // Table change handler
    const handleTableChange = (paginationConfig: any) => {
        if (paginationConfig.current !== page) setPage(paginationConfig.current);
        if (paginationConfig.pageSize !== limit) setLimit(paginationConfig.pageSize);
    };

    // Handle search input
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1);
    };

    // Modal for subscription details
    const renderDetailsModal = () => {
        const sub = selectedSubscription;
        return (
            <Modal
                open={modalOpen}
                title="Subscription Details"
                onCancel={() => { setModalOpen(false); setSelectedSubscription(null); }}
                footer={null}
            >
                {sub ? (
                    <div className="space-y-2">
                        <div>
                            <b>Vendor Name:</b> {sub.vendor?.name}
                        </div>
                        <div>
                            <b>Vendor Email:</b> {sub.vendor?.email}
                        </div>
                        <div>
                            <b>Plan Title:</b> {sub.plan?.title}
                        </div>
                        <div>
                            <b>Plan Price:</b> ₹{sub.plan?.price}
                        </div>
                        <div>
                            <b>Duration:</b> {sub.plan?.duration}
                        </div>
                        <div>
                            <b>Status:</b>{' '}
                            <Tag color={sub.status === 'active' ? 'green' : 'volcano'}>
                                {sub.status.toUpperCase()}
                            </Tag>
                        </div>
                        <div>
                            <b>Current Period Start:</b>{' '}
                            {sub.currentPeriodStart ? new Date(sub.currentPeriodStart).toLocaleString() : '-'}
                        </div>
                        <div>
                            <b>Current Period End:</b>{' '}
                            {sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleString() : '-'}
                        </div>
                        <div>
                            <b>Price:</b> ₹{sub.price}
                        </div>
                        <div>
                            <b>Subscription ID:</b> {sub._id}
                        </div>
                    </div>
                ) : null}
            </Modal>
        );
    };

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <HeaderTitle title="Subscribers" />
                <Input
                    placeholder="Search by vendor name or email"
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
                    dataSource={filteredSubscriptions}
                    loading={isFetching}
                    pagination={
                        dashboard
                            ? false
                            : {
                                pageSize: pagination?.limit || limit,
                                total: pagination?.totalItems || 0,
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
            {renderDetailsModal()}
        </div>
    );
}
