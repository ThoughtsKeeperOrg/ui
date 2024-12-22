import React, { useState, useEffect } from "react";

// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function ThoughtsForm({addThought, dataRepository}) {
  const [content, setContent] = useState('');
  const [convertToText, setConvertToText] = useState(true);
  const [file, setFile] = useState(null);

  const handleSubmit = () => { 


    const createItem = async () => {
      let payload = {thought: { content: content }};

      if(file){
        payload['file'] = {};
        payload['file']['convert_to_text'] = convertToText;
        payload['file']['filename'] = file.name;
        payload['file']['type'] = file.type;
        payload['file']['file_base64'] = await getBase64(file);
      }

      console.log(payload);

      const created_item = await dataRepository.createItem(payload);
      console.log(created_item);

      addThought(created_item['entity']);
      setContent('');
      setFile(null);
    };
    createItem();
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const regex = /data:.*base64,/;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.replace(regex,""));
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control as="textarea" rows={2} autoFocus value={content} onChange={e => setContent(e.target.value)} />
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control type="file" size="sm"  onChange={e => setFile(e.target.files[0])} />
        <Form.Select size="sm" className="file_joined_select" value={convertToText} onChange={e => setConvertToText(e.target.value)}>
          <option value="true"  >Convert to text</option>
          <option value="false">Do not convert to text</option>
        </Form.Select>
      </InputGroup>

      <Button variant="outline-primary" className="" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}
