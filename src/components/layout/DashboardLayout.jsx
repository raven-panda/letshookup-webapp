import { Outlet, useLocation } from 'react-router-dom';
import Button from '../button/Button.jsx';
import { BellIcon, CommentBubbleIcon, LinkIcon, PeoplesIcon } from '../icon';
import { twMerge } from 'tailwind-merge';

export default function DashboardLayout() {
  const location = useLocation();

  const isCurrentLocationGivenOne = (path) => {
    const splittedHref = location.pathname?.split('/');
    return !!splittedHref && splittedHref[splittedHref.length - 1] === path;
  };

  return (
    <main className="flex">
      <nav className="h-screen bg-secondary-1 p-2">
        <div className="border-b border-common-2 pb-4">
          <Button.Filled
            variant="transparent"
            className="block p-2 rounded-full text-common-2"
          >
            <LinkIcon />
          </Button.Filled>
        </div>
        <div className="border-b border-common-2 py-4">
          <Button.Filled
            variant="transparent"
            className={twMerge(
              'block p-2 rounded-full',
              isCurrentLocationGivenOne('notifications')
                ? 'text-accent-action'
                : 'text-common-2',
            )}
          >
            <BellIcon />
          </Button.Filled>
        </div>
        <Button.Filled
          variant="transparent"
          className={twMerge(
            'block p-2 rounded-full mt-4',
            isCurrentLocationGivenOne('messages')
              ? 'text-accent-action'
              : 'text-common-2',
          )}
        >
          <CommentBubbleIcon />
        </Button.Filled>
        <Button.Filled
          variant="transparent"
          className={twMerge(
            'block p-2 rounded-full',
            isCurrentLocationGivenOne('groups')
              ? 'text-accent-action'
              : 'text-common-2',
          )}
        >
          <PeoplesIcon />
        </Button.Filled>
      </nav>
      <Outlet />
    </main>
  );
}
