import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import ThoughtsList from './components/Thoughts/List';

import CrudDataRepository from '../repositories/crudDataRepository';
import CrudAdapter from '../adapters/crudAdapter';
import { useParams } from "react-router-dom";

const ThoughtsAssociations = () => {
  const { id } = useParams();
  const [associatons, setAssociatons] = useState([]);
  const [thought, setThought] = useState(null);

  const apiAdapter = CrudAdapter(process.env.REACT_APP_BE_API_URL);
  const thoughtsRepository = CrudDataRepository(apiAdapter, 'api/thoughts');

  useEffect(() => {
      const fetchAssociations = async () => {
          const data = await thoughtsRepository.getItemById(id+"/associations");
          setAssociatons(data);
      };
      fetchAssociations();

      const fetchThought = async () => {
          const data = await thoughtsRepository.getItemById(id);

          setThought(data.content.replace(/\n/g, "<br />"));
      };
      fetchThought();
  }, [id]);

  return <Row>
          <Col>
            <h4>Thought: </h4>
            <div dangerouslySetInnerHTML={{ __html: thought}} />

            <hr/>
            <ThoughtsList items={associatons}/>
          </Col>
        </Row>;
};

export default ThoughtsAssociations;
