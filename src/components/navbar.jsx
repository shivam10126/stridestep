import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, LogIn, LogOut, ClipboardList, Menu, MoreVertical, Home, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const readUsername = () => {
  try {
    const authInfo = JSON.parse(localStorage.getItem('authInfo'));
    return authInfo?.name || 'Guest';
  } catch {
    return 'Guest';
  }
};

const Navbar = () => {
  const [username, setUsername] = useState(readUsername);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();

  // Keep the search box in step with the URL.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('query') || '');
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('authInfo');
    setUsername('Guest');
    navigate('/');
  };

  const handleLogin = () => navigate('/signUp');

  const submitSearch = () => {
    const term = searchTerm.trim();
    navigate(term ? `/search?query=${encodeURIComponent(term)}` : '/search');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submitSearch();
  };

  const menuItems = [
    { icon: User, label: username, action: username === 'Guest' ? handleLogin : undefined },
    { icon: Home, label: 'Home', action: () => navigate('/') },
    { icon: Search, label: 'Shop', action: () => navigate('/search') },
    { icon: Heart, label: wishCount > 0 ? `Wishlist (${wishCount})` : 'Wishlist', action: () => navigate('/wishlist') },
    { icon: ShoppingCart, label: count > 0 ? `Cart (${count})` : 'Cart', action: () => navigate('/checkout') },
    { icon: ClipboardList, label: 'Previous Orders', action: () => navigate('/orders') },
  ];

  const toggleMenu = () => setIsMenuOpen((o) => !o);

  return (
    <nav className="relative flex items-center justify-between px-4 py-2 bg-[#eb432f] text-white">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-4xl tracking-widest font-protest">StrideStep</span>
      </Link>

      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#505b85]" />
          <Input
            type="search"
            placeholder="Search..."
            aria-label="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-8 bg-white focus:ring-offset-0 focus-visible:ring-0 text-[black] placeholder:text-[#9e92aa]"
          />
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/wishlist"
          aria-label={wishCount > 0 ? `Wishlist, ${wishCount} items` : 'Wishlist'}
          className="relative p-1 rounded hover:bg-white/15 transition-colors"
        >
          <Heart className={`h-6 w-6 ${wishCount > 0 ? 'fill-white' : ''}`} />
          {wishCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#6e36aa] text-white rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[11px] font-bold">
              {wishCount > 99 ? '99+' : wishCount}
            </span>
          )}
        </Link>
        <Link
          to="/checkout"
          aria-label={count > 0 ? `Cart, ${count} items` : 'Cart'}
          className="relative p-1 rounded hover:bg-white/15 transition-colors"
        >
          <ShoppingCart className="h-6 w-6" />
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#6e36aa] text-white rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[11px] font-bold">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>
        <span className="font-medium font-roboto-slab capitalize text-lg">{username}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#9e92aa] text-white border-[#9e92aa]">
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                onClick={item.action}
                className="focus:bg-[#eb432f] focus:text-white cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">{item.label}</span>
              </DropdownMenuItem>
            ))}

            {username === 'Guest' ? (
              <DropdownMenuItem onClick={handleLogin} className="focus:bg-[#eb432f] focus:text-white cursor-pointer">
                <LogIn className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">Login</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleLogout} className="focus:bg-[#eb432f] focus:text-white cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">Log out</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center gap-1">
        <Link to="/checkout" aria-label="Cart" className="relative p-2">
          <ShoppingCart className="h-6 w-6" />
          {count > 0 && (
            <span className="absolute top-0 right-0 bg-[#6e36aa] text-white rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[11px] font-bold">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </Link>
        <Button variant="ghost" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle menu" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#eb432f] md:hidden z-40 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="relative mb-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#505b85]" />
              <Input
                type="search"
                placeholder="Search..."
                aria-label="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-8 bg-white text-[black] placeholder:text-[#9e92aa]"
              />
            </div>
            {menuItems.map((item) => (
              <button
                type="button"
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  item.action?.();
                }}
                className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}

            {username === 'Guest' ? (
              <button type="button" onClick={handleLogin} className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
            ) : (
              <button type="button" onClick={handleLogout} className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
