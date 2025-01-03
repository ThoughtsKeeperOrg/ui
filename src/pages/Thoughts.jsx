import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from "react";
import {Socket} from "phoenix"
import ThoughtsForm from './components/Thoughts/Form';
import ThoughtsList from './components/Thoughts/List';
import CrudDataRepository from '../repositories/crudDataRepository';
import CrudAdapter from '../adapters/crudAdapter';

const apiAdapter = CrudAdapter(process.env.REACT_APP_BE_API_URL);
const dataRepository = CrudDataRepository(apiAdapter, 'api/thoughts');

const Home = () => {
  const [items, setItems] = useState([]);
  const [updated_item, setUpdatedItem] = useState(null);

  const connectToWS = () => {
    const ROOT_SOCKET = 'ws://localhost:4000'
    let socket = new Socket("ws://localhost:4000/socket", {params: {token: window.userToken}});
    socket.connect()

    let channel = socket.channel("room:lobby", {})

    channel.on("new_msg", payload => {
      console.log('WS message received:')
      console.log(payload)
      setUpdatedItem(payload['entity']);
    })

    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
  }

  useEffect(() => {
      const fetchItems = async () => {
          const data = await dataRepository.getAllItems();
          setItems(data);
      };
      fetchItems();

      connectToWS();
  }, []);

  useEffect(() => {
    updateThought(updated_item);
  }, [updated_item]);

  const addThought = (item) => {
    setItems([... items,item]);
  }

  const updateThought = (item) => {
      if(!item) { return };
      items[0]['content'] = item['content'];
      setItems(items);
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
