import { useEffect, useState } from "react";
import ListForm from "../components/ListForm";
import ListTable from "../components/ListTable";
import api from "../services/api";
import { message } from "antd";

const Home = () => {

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const fetchLists = async () => {

        try {
            setLoading(true);
            const response = await api.get("/list");
            setLists(response.data.data);
        } catch (error) {
            console.log(error);
            message.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

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

                    <ListTable
                        lists={lists}
                        loading={loading}
                        fetchLists={fetchLists}
                        setEditingRecord={setEditingRecord}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;