// Renders a <script type="application/ld+json"> tag. `data` must come from
// trusted, server-constructed values only (never raw user input) since it is
// serialized directly into the page without HTML-escaping beyond JSON.stringify.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
