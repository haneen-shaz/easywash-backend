import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log('Keyword:',keyword);
    if (keyword) {
      navigate(`/?keyword=${keyword}`)
    } else {
      navigate('/')
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className='d-flex align-items-center'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: '400px' }}
        className='mr-2'
        placeholder='Search'
      />
      <Button
        type='submit'
        className='ml-2 p-2'
        style={{ background: 'linear-gradient(to bottom, #F36414, #E7BB1C)', marginLeft: '10px' }}
      >
        Submit
      </Button>
    </Form>
  );
};

export default SearchBox;
