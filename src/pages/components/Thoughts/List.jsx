export default function ThoughtsList({items}) {
  const rows = [];

  // items.slice().reverse().forEach((item) => {
  items.reduceRight((_, item) => {
    rows.push(
      <div key={item.id} dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, "<br />")}} />
    );
  }, 0);

  return rows;
}
