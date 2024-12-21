export default function ThoughtsList({items}) {
  const rows = [];

  // items.slice().reverse().forEach((item) => {
  items.reduceRight((_, item) => {
    rows.push(
      <div key={item.id}>
        {item.content}
      </div>
    );
  }, 0);

  return rows;
}
