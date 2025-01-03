// import socket from './../../../user_socket';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from "react-router-dom";

export default function ThoughtsListItem({item}) {
  
  let navigate = useNavigate();

  const goToAssociations = () => {
    navigate("/api/thoughts/"+item.id+"/associations");
  };

  return (
    <Stack key={item.id} direction="horizontal" gap={3} className="wide-list-item" >
      <div className="me-auto" dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />")}} />
      <Button variant="outline-info" size="sm" onClick={goToAssociations}>
          View associations
      </Button>
      <hr/>
    </Stack>
  );
}
