// import socket from './../../../user_socket';

import ThoughtsListItem from './ListItem';

export default function ThoughtsList({items}) {
  const rows = [];

  items.reduceRight((_, item) => {
    rows.push(
      <ThoughtsListItem item={item}/>
    );
  }, 0);

  return rows;
}
