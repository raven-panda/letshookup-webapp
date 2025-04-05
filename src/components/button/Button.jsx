import { twMerge } from 'tailwind-merge';

function Filled({ children, variant = 'main', className = '', ...props }) {
  const classNamesForVariant = (() => {
    switch (variant) {
      case 'valid':
        return [
          'bg-accent-valid',
          'hover:bg-accent-valid-2',
          'focus-visible:bg-accent-valid-2',
          'active:bg-accent-valid-3',
          'text-common-2',
        ];
      default:
        return [
          'bg-common-2',
          'hover:bg-common-2',
          'focus-visible:bg-common-2',
          'active:bg-common-2',
          'text-common-1',
        ];
    }
  })();

  return (
    <button
      className={twMerge(
        'rounded-md py-3 px-4',
        ...classNamesForVariant,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Outline({ children, variant = 'main', className = '', ...props }) {
  const classNamesForVariant = (() => {
    switch (variant) {
      case 'valid':
        return [
          'border-accent-valid',
          'hover:border-accent-valid-2',
          'hover:bg-placeholder-3',
          'focus-visible:border-accent-valid-2',
          'focus-visible:bg-placeholder-3',
          'active:border-accent-valid-3',
          'active:bg-placeholder-2',
          'text-accent-valid',
          'hover:text-accent-valid-2',
          'focus-visible:text-accent-valid-2',
          'active:text-accent-valid-3',
        ];
      default:
        return [
          'border-common-1',
          'hover:border-common-1',
          'hover:bg-placeholder-2',
          'focus-visible:border-common-1',
          'focus-visible:bg-placeholder-2',
          'active:border-common-1',
          'active:bg-placeholder-1',
          'text-common-1',
          'hover:text-common-1',
          'focus-visible:text-common-1',
          'active:text-common-1',
        ];
    }
  })();

  return (
    <button
      className={twMerge(
        'border-2 rounded-md py-3 px-4',
        ...classNamesForVariant,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

const Button = {
  Filled,
  Outline,
};

export default Button;
