export default function stopEventPropagation<T extends React.SyntheticEvent>(event: T) {
  event.stopPropagation();
}
