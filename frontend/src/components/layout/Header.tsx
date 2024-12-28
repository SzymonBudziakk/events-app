import { useState } from 'react';
import { Home, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="w-full border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <a href="/" className="flex items-center space-x-2">
                    <Home className="h-6 w-6" />
                    <span className="text-lg font-semibold">Events</span>
                </a>

                <nav className="hidden md:flex space-x-4 items-center">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                                location.pathname === item.href ? 'text-blue-600' : 'text-gray-600'
                            }`}
                        >
                            {item.name}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <a
                        href="/signin"
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Sign In
                    </a>
                    <a
                        href="/signup"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                        Sign Up
                    </a>
                </div>

                <button
                    className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    onClick={() => setMenuOpen(!isMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                        <X className="h-6 w-6" aria-hidden="true" />
                    ) : (
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${
                                    location.pathname === item.href
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="/signin"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign In
                        </a>
                        <a
                            href="/signup"
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}