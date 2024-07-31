import BlogTable from "../components/BlogTable";
import useFetchDataFromSearch from "../hooks/useFetchDataFromSearch";

export default function BlogList() {

    const { data, setData ,loading } = useFetchDataFromSearch();

    return (
        <BlogTable data={data} setData={setData} loading={loading}/>
    )
}

