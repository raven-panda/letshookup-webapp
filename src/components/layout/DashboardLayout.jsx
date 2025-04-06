import { Link, Outlet, useLocation } from 'react-router-dom';
import Button from '../button/Button.jsx';
import { BellIcon, CommentBubbleIcon, LinkIcon, PeoplesIcon } from '../icon';
import { twMerge } from 'tailwind-merge';

export default function DashboardLayout() {
  const location = useLocation();

  const isCurrentLocationGivenOne = (path) => {
    const splitHref = location.pathname?.split('/');
    return !!splitHref && splitHref[splitHref.length - 1] === path;
  };

  return (
    <main className="flex">
      <nav className="h-screen bg-secondary-1 p-2">
        <div className="border-b border-common-2 pb-4">
          <LinkIcon className="block m-2 text-common-2" />
        </div>
        <div className="border-b border-common-2 py-4">
          <Link
            to={'/dashboard/notifications'}
            className={twMerge(
              'block p-2 rounded-full',
              isCurrentLocationGivenOne('notifications')
                ? 'text-accent-action'
                : 'text-common-2',
            )}
          >
            <BellIcon />
          </Link>
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
