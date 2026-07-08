import { useEffect, useState } from "react";
import ListForm from "../components/ListForm";
import ListTable from "../components/ListTable";
import api from "../services/api";
import { message, Input } from "antd";

const { Search } = Input;

const Home = () => {

    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const [loading, setLoading] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const fetchLists = async (
        page = currentPage,
        limit = pageSize,
        search = searchQuery
    ) => {
        try {
            setLoading(true);
            const response = await api.get(
                `/list?page=${page}&limit=${limit}&search=${search}`
            );
            setLists(response.data.data);
            setTotalRecords(
                response.data.pagination.totalRecords
            );
            setCurrentPage(page);
            setPageSize(limit);
        }catch (error) {
            console.log(error);
            message.error("Failed to fetch data");
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLists(1, pageSize, searchQuery); // Reset to page 1 on mount/search
    }, []);

    const handleSearch = (value) => {
        setSearchQuery(value);
        fetchLists(1, pageSize, value); // Always reset to page 1 when searching
    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">
                    List Management
                </h1>

                <ListForm
                    fetchLists={fetchLists}
                    editingRecord={editingRecord}
                    setEditingRecord={setEditingRecord}
                />

                <div className="mt-10">
                    {/* Added Search Bar */}
                    <div className="mb-4 max-w-md">
                        <Search
                            placeholder="Search by title or description..."
                            allowClear
                            enterButton="Search"
                            size="large"
                            onSearch={handleSearch}
                            onChange={(e) => {
                                if (!e.target.value) handleSearch(""); // Triggers fetch clear when user hits 'x'
                            }}
                        />
                    </div>

                    <ListTable
                        lists={lists}
                        loading={loading}
                        fetchLists={fetchLists}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalRecords={totalRecords}
                        setEditingRecord={setEditingRecord}
                        searchQuery={searchQuery} // Pass down searchQuery
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;