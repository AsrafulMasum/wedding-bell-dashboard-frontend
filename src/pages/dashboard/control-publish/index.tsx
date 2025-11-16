'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Table, Tabs, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import DeleteModal from '../../../components/modals/DeleteModal';
import { ActiveTab, CityType, RegionType, StatusType } from '../../../types/types';
import AddRegionCityModal from '../../../components/modals/AddRegionCityModal';

const statusColorMap: Record<StatusType, { color: string; bg: string }> = {
    active: { color: '#52C41A', bg: '#D9F2CD' },
    inactive: { color: '#FF0000', bg: '#FFCCCC' },
};

/* ---------- Sample Data ---------- */
const initialRegionData: RegionType[] = [
    { key: '1', regionName: 'Ontario', totalCity: 5, status: 'active' },
    { key: '2', regionName: 'British Columbia', totalCity: 4, status: 'inactive' },
    { key: '3', regionName: 'Alberta', totalCity: 3, status: 'active' },
    { key: '4', regionName: 'Quebec', totalCity: 6, status: 'inactive' },
];

const initialCityData: CityType[] = [
    { key: '1', regionName: 'Ontario', cityName: 'Toronto', status: 'active' },
    { key: '2', regionName: 'Ontario', cityName: 'Ottawa', status: 'inactive' },
    { key: '3', regionName: 'British Columbia', cityName: 'Vancouver', status: 'active' },
    { key: '4', regionName: 'Alberta', cityName: 'Calgary', status: 'inactive' },
];

/* ---------- Main Component ---------- */
export default function ControlPublish({ dashboard }: { dashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('region');

    const [regionList, setRegionList] = useState<RegionType[]>(initialRegionData);
    const [cityList, setCityList] = useState<CityType[]>(initialCityData);

    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<RegionType | CityType | null>(null);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);

    /* ---------- Helpers ---------- */
    // const regionNames = useMemo(() => regionList.map((r) => r.regionName), [regionList]);

    /* Handle Add / Edit submit */
    const handleAddEditSubmit = (values: any) => {
        if (activeTab === 'region') {
            // region mode
            if (editingItem && (editingItem as RegionType).regionName) {
                // update existing region
                const updated = regionList.map((r) =>
                    r.key === (editingItem as RegionType).key ? { ...(r as RegionType), ...values } : r,
                );
                setRegionList(updated);
                message.success('Region updated successfully!');
                // also, if regionName changed, update cityList regionName references
                if (editingItem && values.regionName && values.regionName !== (editingItem as RegionType).regionName) {
                    setCityList((prev) =>
                        prev.map((c) =>
                            c.regionName === (editingItem as RegionType).regionName
                                ? { ...c, regionName: values.regionName }
                                : c,
                        ),
                    );
                }
            } else {
                // add new region
                const newRegion: RegionType = {
                    key: Date.now().toString(),
                    regionName: values.regionName,
                    totalCity: Number(values.totalCity),
                    status: values.status ?? 'active',
                };
                setRegionList([...regionList, newRegion]);
                message.success('Region added successfully!');
            }
        } else {
            // city mode
            if (editingItem && (editingItem as CityType).cityName) {
                // update city
                const updated = cityList.map((c) =>
                    c.key === (editingItem as CityType).key ? { ...(c as CityType), ...values } : c,
                );
                setCityList(updated);
                message.success('City updated successfully!');
            } else {
                // add new city
                const newCity: CityType = {
                    key: Date.now().toString(),
                    regionName: values.regionName,
                    cityName: values.cityName,
                    status: values.status ?? 'active',
                };
                setCityList([...cityList, newCity]);
                message.success('City added successfully!');
            }
        }

        // close modal and reset editing state
        setIsAddEditModalOpen(false);
        setEditingItem(null);
    };

    /* Delete confirm */
    const handleDeleteConfirm = () => {
        if (!deletingKey) return;
        if (activeTab === 'region') {
            // remove region and optionally remove/keep cities (here we keep cities but you may want to remove or reassign)
            const regionToDelete = regionList.find((r) => r.key === deletingKey);
            setRegionList(regionList.filter((r) => r.key !== deletingKey));
            // Optionally: remove cities belonging to this region. For now we'll REMOVE them to keep data consistent:
            if (regionToDelete) {
                setCityList((prev) => prev.filter((c) => c.regionName !== regionToDelete.regionName));
            }
            message.success('Region deleted successfully!');
        } else {
            setCityList(cityList.filter((c) => c.key !== deletingKey));
            message.success('City deleted successfully!');
        }
        setIsDeleteModalOpen(false);
        setDeletingKey(null);
    };

    /* Edit click */
    const handleEditClick = (record: RegionType | CityType) => {
        setEditingItem(record);
        setIsAddEditModalOpen(true);
    };

    /* Columns based on active tab */
    const columns: ColumnType<any>[] =
        activeTab === 'region'
            ? [
                  {
                      title: 'Serial No.',
                      dataIndex: 'key',
                      key: 'key',
                      render: (_: any, __: any, index: number) => index + 1,
                  },
                  {
                      title: 'Region',
                      dataIndex: 'regionName',
                      key: 'regionName',
                  },
                  {
                      title: 'Total City',
                      dataIndex: 'totalCity',
                      key: 'totalCity',
                      responsive: ['sm'] as any,
                  },
                  {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status: StatusType) => {
                          const currentStyle = statusColorMap[status] ?? { color: '#595959', bg: '#FAFAFA' };
                          return (
                              <p
                                  className="capitalize px-1 py-0.5 text-center rounded-lg max-w-40"
                                  style={{ color: currentStyle.color, backgroundColor: currentStyle.bg }}
                              >
                                  {status}
                              </p>
                          );
                      },
                  },
                  {
                      title: 'Action',
                      key: 'action',
                      render: (_: any, record: RegionType) => (
                          <div className="flex gap-2">
                              <Button
                                  type="text"
                                  icon={<FiEdit size={20} />}
                                  onClick={() => {
                                      handleEditClick(record);
                                  }}
                              />
                              <Button
                                  type="text"
                                  icon={<MdOutlineDeleteOutline size={24} />}
                                  className="text-red-500"
                                  onClick={() => {
                                      setDeletingKey(record.key);
                                      setIsDeleteModalOpen(true);
                                  }}
                              />
                          </div>
                      ),
                  },
              ]
            : [
                  {
                      title: 'Serial No.',
                      dataIndex: 'key',
                      key: 'key',
                      render: (_: any, __: any, index: number) => index + 1,
                  },
                  {
                      title: 'Region',
                      dataIndex: 'regionName',
                      key: 'regionName',
                      filters: regionList.map((r) => ({ text: r.regionName, value: r.regionName })),
                      onFilter: (value, record) => record.regionName === value,
                      filterSearch: true,
                  },
                  {
                      title: 'City',
                      dataIndex: 'cityName',
                      key: 'cityName',
                  },
                  {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status: StatusType) => {
                          const currentStyle = statusColorMap[status] ?? { color: '#595959', bg: '#FAFAFA' };
                          return (
                              <p
                                  className="capitalize px-1 py-0.5 text-center rounded-lg max-w-40"
                                  style={{ color: currentStyle.color, backgroundColor: currentStyle.bg }}
                              >
                                  {status}
                              </p>
                          );
                      },
                  },
                  {
                      title: 'Action',
                      key: 'action',
                      render: (_: any, record: CityType) => (
                          <div className="flex gap-2">
                              <Button
                                  type="text"
                                  icon={<FiEdit size={20} />}
                                  onClick={() => {
                                      handleEditClick(record);
                                  }}
                              />
                              <Button
                                  type="text"
                                  icon={<MdOutlineDeleteOutline size={24} />}
                                  className="text-red-500"
                                  onClick={() => {
                                      setDeletingKey(record.key);
                                      setIsDeleteModalOpen(true);
                                  }}
                              />
                          </div>
                      ),
                  },
              ];

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle title={activeTab === 'region' ? 'Regions' : 'Cities'} />
                <button
                    className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                    onClick={() => {
                        setEditingItem(null);
                        setIsAddEditModalOpen(true);
                    }}
                >
                    Add {activeTab === 'region' ? 'Region' : 'City'}
                </button>
            </div>

            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#59A817' },
                }}
            >
                <Tabs
                    defaultActiveKey="region"
                    onChange={(key) => setActiveTab(key as ActiveTab)}
                    items={[
                        {
                            key: 'region',
                            label: 'Region',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={regionList}
                                    pagination={dashboard ? false : { pageSize: 9, total: regionList.length }}
                                    className="custom-table"
                                    rowKey="key"
                                />
                            ),
                        },
                        {
                            key: 'city',
                            label: 'City',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={cityList}
                                    pagination={dashboard ? false : { pageSize: 9, total: cityList.length }}
                                    className="custom-table"
                                    rowKey="key"
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>

            {/* Modals */}
            <AddRegionCityModal
                open={isAddEditModalOpen}
                onCancel={() => {
                    setIsAddEditModalOpen(false);
                    setEditingItem(null);
                }}
                onSubmit={handleAddEditSubmit}
                editingItem={editingItem}
                activeTab={activeTab}
                regionOptions={regionList}
            />

            <DeleteModal
                open={isDeleteModalOpen}
                onCancel={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingKey(null);
                }}
                onConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
