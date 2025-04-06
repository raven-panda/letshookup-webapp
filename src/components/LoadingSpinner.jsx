import { SpinnerIcon } from './icon/index.js';

export default function LoadingSpinner({ ...props }) {
  return <SpinnerIcon {...props} className="animate-spin" />;
}
