function SnackList() {
  const snacks = [
    { rank: 3, name: 'Chocolate' },
    { rank: 4, name: 'Popcorn' },
    { rank: 1, name: 'Mexican Candies' },
    { rank: 5, name: 'Chips' },
    { rank: 2, name: 'Ice Cream' },
  ];
  return (
    <ol>
      {snacks
        .toSorted((a, b) => a.rank - b.rank)
        .map((snack) => (
          <li key={snack.rank}>{snack.name}</li>
        ))}
    </ol>
  );
}
export default SnackList;
