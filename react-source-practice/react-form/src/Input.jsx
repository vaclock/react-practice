export default function Input({onChange, value}) {
  return (
    <input type="text" value={value} onChange={(event) => {
      onChange(event.target.value)
    }} />
  )
}

Input.displayName = 'input'