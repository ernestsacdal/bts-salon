import { Fragment } from 'react';
import { Menu } from '@headlessui/react';
import watson from '../components/view/components/assets/watson.jpg';

function Logout() {
  const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/sign-out', label: 'Sign out' },
  ];

  const user = {
    name: 'Admin Admin', // Replace with the user's name
    avatar: watson, // Replace with the user's avatar image source
  };

  return (
    <Menu>
      <Menu.Button className="flex items-center space-x-2 hover:bg-second hover:text-white px-4 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
        <span className="hidden md:inline-block">{user.name}</span>
      </Menu.Button>
      <Menu.Items className="absolute left-0 m-2 mt-8 w-56 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {links.map((link) => (
          <Menu.Item key={link.href} as={Fragment}>
            {({ active }) => (
              <a
                href={link.href}
                className={`${
                  active
                    ? 'bg-second text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                } block px-4 py-2 text-sm`}
              >
                {link.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}

export default Logout;
