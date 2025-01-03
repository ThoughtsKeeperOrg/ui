import ThoughtsListItem from './ListItem';

export default function ThoughtsList({items}) {
  const rows = [];

  items.reduceRight((_, item) => {
    rows.push(
      <ThoughtsListItem key={item.id} item={item}/>
    );
  }, 0);

  return rows;
}
