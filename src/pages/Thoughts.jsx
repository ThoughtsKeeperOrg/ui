import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import ThoughtsForm from './components/Thoughts/Form';
import ThoughtsList from './components/Thoughts/List';

import CrudDataRepository from '../repositories/crudDataRepository';
import CrudAdapter from '../adapters/crudAdapter';

const apiAdapter = CrudAdapter(process.env.REACT_APP_BE_API_URL);
const dataRepository = CrudDataRepository(apiAdapter, 'api/thoughts');

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      const fetchItems = async () => {
          const data = await dataRepository.getAllItems();
          setItems(data);
      };
      fetchItems();
  }, []);

  const addThought = (item) => {

    setItems([... items,item]);
  }

  return <Row>
          <Col>
            <h4>Thoughts</h4>
            <ThoughtsForm addThought={addThought} dataRepository={dataRepository} />
            <hr/>
            <ThoughtsList items={items}/>
          </Col>
        </Row>;
};

export default Home;
