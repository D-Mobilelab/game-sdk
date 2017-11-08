export default function focusChange(focusEvent) {
  return { type: 'FOCUS_CHANGE', payload: { focus: focusEvent.type === 'focus' } };
}
