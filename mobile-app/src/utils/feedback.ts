type AlertButton = { text?: string; onPress?: () => void };
export type FeedbackTone = 'success' | 'error' | 'info';
export type FeedbackNotice = { title: string; message: string; tone: FeedbackTone; buttonText?: string; onConfirm?: () => void };
type FeedbackListener = (notice: FeedbackNotice) => void;

const listeners = new Set<FeedbackListener>();

export function subscribeFeedback(listener: FeedbackListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function toneFor(title: string): FeedbackTone {
  const normalized = title.toLowerCase();
  if (/(not|needed|check|complete the|enter an|insufficient)/.test(normalized)) return 'error';
  if (/(complete|purchased|sent|saved|cleared|started|conversion)/.test(normalized)) return 'success';
  return 'info';
}

export function showAlert(title: string, message: string, buttons?: AlertButton[]) {
  const lastButton = buttons?.[buttons.length - 1];
  const notice: FeedbackNotice = { title, message, tone: toneFor(title), buttonText: lastButton?.text, onConfirm: lastButton?.onPress };
  listeners.forEach((listener) => listener(notice));
}
