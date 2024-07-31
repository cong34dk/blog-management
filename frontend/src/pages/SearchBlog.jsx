import { useSearchParams } from "react-router-dom";
import useFetchDataFromSearch from "../hooks/useFetchDataFromSearch";
import { useState } from "react";
import BlogTable from "../components/BlogTable";


export default function SearchBlog() {

    let [searchString, setSearchString] = useSearchParams();

    const [searchInput, setSearchInput] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (searchInput != "") {
            setSearchString({ searchString: searchInput });
        } else {
            setSearchString();
        }
    }

    const { data, setData ,loading } = useFetchDataFromSearch(searchString);



    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    Search Blog
                </div>
                <div className="card-body">
                    <form className="flex-column text-center" onSubmit={handleSubmit}>
                        <div className="mb-3 d-flex flex-row align-items-center gap-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" name="searchString" className="form-control" id="title" placeholder="Search" onChange={(e) => setSearchInput(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <BlogTable data={data} setData={setData} loading={loading}/>
        </>
    )
}

