export default function Item({ item: { id, description, quantity, packed }, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" checked={packed} onChange={() => onToggleItem(id)}/>
      <span style={ packed ? {textDecoration: 'line-through'} : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  )
}