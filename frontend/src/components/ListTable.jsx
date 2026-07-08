import { Table, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../services/api";

const ListTable = ({
    lists,
    loading,
    fetchLists,
    currentPage,
    pageSize,
    totalRecords,
    setEditingRecord,
    searchQuery // 1. Destructure the search query prop
}) => {
    const handleSoftDelete = async (id) => {
        try {
            await api.patch(`/list/soft-delete/${id}`);
            message.success("List soft deleted successfully");
            // fetchLists();
            fetchLists(currentPage,pageSize);
        } catch (error) {
            console.error(error);
            message.error("Failed to delete");
        }
    };

    const handleHardDelete = async (id) => {
        try {
            await api.delete(`/list/${id}`);
            message.success("List deleted permanently");
            // fetchLists();
            fetchLists(currentPage,pageSize);
        } catch (error) {
            console.error(error);
            message.error("Failed to delete");
        }
    };

    const columns = [
        // {
        //     title: "ID",
        //     dataIndex: "id",
        // },
        {
        title: "ID",
        dataIndex: "id",
        key: "id",
        // Add a render function to truncate the long UUID string for display
        render: (id) => (
            <span title={id} style={{ fontFamily: "monospace" }}>
                {id && id.length > 10 ? `${id.substring(0, 8)}...` : id}
            </span>
        ),
    },
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Actions",

            render: (_, record) => (

                <Space>

                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setEditingRecord(record)}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Soft Delete"
                        description="Are you sure you want to soft delete this record?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleSoftDelete(record.id)}
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            >
                            Soft Delete
                        </Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Hard Delete"
                        description="This action cannot be undone. Continue?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleHardDelete(record.id)}
                    >
                        <Button
                            danger
                            ghost
                            icon={<DeleteOutlined />}
                            >
                            Hard Delete
                        </Button>
                    </Popconfirm>

                </Space>

            ),
        }
    ];

    return (

        <Table
            rowKey="id"
            columns={columns}
            dataSource={lists}
            loading={loading}
            pagination={{
                current: currentPage,
                pageSize,
                total: totalRecords,
                showSizeChanger: true,
                pageSizeOptions:["5","10","20"],
                onChange:(page,size)=>{
                    fetchLists(page, size, searchQuery);
                }
            }}
        />
    );
};

export default ListTable;