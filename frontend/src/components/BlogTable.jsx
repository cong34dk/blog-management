import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import blogApi from "../api/blogApi";


export default function BlogTable({data, setData ,loading }) {
    //Handle events khi click vào button Delete
    async function onDeleteHandler(id) {
        var confirm = window.confirm("Delete?");

        if (confirm) {
            const result = await blogApi.deleteData(`/api/Blog/${id}`);
            if(result){
                setData(prev => prev.filter(p => p.id !== id));
            }
        }
    }


    return (
        <>
            <div className="card">
                <div className="card-header">
                    List Blog
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Tin</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Vị trí</th>
                                <th scope="col">Ngày public</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loading && Array.isArray(data) &&
                                data.map(blog =>
                                    <tr key={blog.id}>
                                        <td scope="row">{blog.id}</td>
                                        <td>{blog.title}</td>
                                        <td className="text-center">
                                            <img src={`${import.meta.env.VITE_API_HOST}/${blog.image}`} className="rounded" height={150}></img>
                                        </td>
                                        <td>{blog.category}</td>
                                        <td>{blog.position.join(', ')}</td>
                                        <td>{dateFormat(blog.publishDate, "dd/mm/yyyy")}</td>
                                        <td>
                                            <Link type="button" to={`/edit/${blog.id}`} className="btn btn-outline-primary me-1">Edit</Link>
                                            <button type="button" onClick={() => { onDeleteHandler(blog.id) }} className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

