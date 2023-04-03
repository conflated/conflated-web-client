export default function preventDefault<T extends React.SyntheticEvent>(event: T) {
  event.preventDefault();
}
