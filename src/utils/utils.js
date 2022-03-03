export function formatDate() {
  const date = new Date();
  return (
    date.toLocaleTimeString().slice(0, -6) +
    ' ' +
    date.toLocaleTimeString().slice(-2) +
    ', ' +
    date.toLocaleDateString().slice(0, -5) +
    '/' +
    date.toLocaleDateString().slice(-2)
  );
}
