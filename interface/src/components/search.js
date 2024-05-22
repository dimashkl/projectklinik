import {Form } from 'react-bootstrap';

const Search = () => {
    return (
<div className="search">
<Form className="d-flex w-50 my-5 mx-auto">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"/>
  </Form>
  </div>
    )
}
export default Search;