import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout';
import BlogList from './pages/BlogList';
import SearchBlog from './pages/SearchBlog';
import EditBlog from './pages/EditBlog';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />} >
              <Route index element={<BlogList />} />
              <Route path='/search' element={<SearchBlog />} />
              <Route path='create' element={<EditBlog key={'create'} />} />
              <Route path='/edit/:id' element={<EditBlog key={'edit'} />} />
          </Route>
      </Routes>
    </BrowserRouter>
   );
}

export default App;