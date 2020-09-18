import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';

export default function SearchBox(props) {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      props.history.push(`/search/${keyword}`);
    } else {
      props.history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Serach"
        className="mr-sm-2 ml-sm5"
      ></FormControl>
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
}
