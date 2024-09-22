import React, { useState, useEffect } from 'react';
import { Search, User, Settings, ShoppingCart, LogIn, LogOut, ClipboardList, Menu, MoreVertical } from 'lucide-react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [username, setUsername] = useState(""); // Initialize with empty string
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch username from localStorage when the component mounts
  useEffect(() => {
    const authInfo = JSON.parse(localStorage.getItem('authInfo')); // Assuming the username is stored as 'username'
    if (authInfo) {
      console.log(authInfo);
      setUsername(authInfo.name);
    } else {
      setUsername('Guest'); // Fallback if no username is found
    }
  }, []);

  // Handle the logout action
  const handleLogout = () => {
    localStorage.removeItem('authInfo'); // Clear 'authInfo' from localStorage
    navigate('/'); // Navigate to the home page
  };

  const handleLogin = () => {
    localStorage.removeItem('authInfo');
    navigate('/SignUp');
  };

  const menuItems = [
    { icon: User, label: username },
    { icon: Settings, label: 'Settings' },
    { icon: ShoppingCart, label: 'Cart' },
    { icon: ClipboardList, label: 'Previous Orders' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-[#eb432f] text-white">
      <a href="/" className="flex items-center space-x-2">
        <span className="text-4xl tracking-widest font-protest">StrideStep</span>
      </a>

      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#505b85]" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-8 bg-white focus:ring-offset-0 focus-visible:ring-0 text-[black] placeholder:text-[#9e92aa]"
          />
        </div>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="font-medium font-roboto-slab capitalize text-lg">{username}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#9e92aa] text-white border-[#9e92aa]">
            {menuItems.map((item, index) => (
              <DropdownMenuItem key={index} className="focus:bg-[#eb432f] focus:text-white">
                <item.icon className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">{item.label}</span>
              </DropdownMenuItem>
            ))}

            {/* Conditionally render Login/Logout based on username */}
            {username === 'Guest' ? (
              <DropdownMenuItem onClick={handleLogin} className="focus:bg-[#eb432f] focus:text-white">
                <LogIn className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">Login</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleLogout} className="focus:bg-[#eb432f] focus:text-white">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="font-roboto-slab text-base">Log out</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" onClick={toggleMenu} className="text-white">
          <Menu className="h-6 w-6 hover:text-[#eb432f]" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-14 left-0 right-0 bg-[#eb432f] md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                onClick={item.action ? item.action : undefined} // Handle action for mobile menu
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            ))}

            {/* Conditionally render Login/Logout for mobile */}
            {username === 'Guest' ? (
              <a href="#" onClick={handleLogin} className="flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </a>
            ) : (
              <a href="#" onClick={handleLogout} className="flex items-center space-x-2 px-3 py-2 rounded-md text-white hover:bg-[#d13a2b]">
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
