import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart, formatPrice } from '../context/CartContext';

// Routes where the floating cart should stay out of the way.
const HIDDEN_ON = ['/checkout', '/signup'];

export default function Cart() {
  const { items, count, subtotal, notice, removeItem, updateQty } = useCart();
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false); // opened by click/tap, stays until closed
  const closeTimer = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const hidden = HIDDEN_ON.includes(location.pathname.toLowerCase());

  // Close the panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setPinned(false);
  }, [location.pathname]);

  // Close automatically when the last item is removed.
  useEffect(() => {
    if (items.length === 0) {
      setOpen(false);
      setPinned(false);
    }
  }, [items.length]);

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    cancelClose();
    if (items.length > 0) setOpen(true);
  };

  const handleLeave = () => {
    if (pinned) return;
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  };

  const toggle = () => {
    if (items.length === 0) {
      navigate('/search');
      return;
    }
    if (open && pinned) {
      setOpen(false);
      setPinned(false);
    } else {
      setOpen(true);
      setPinned(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice.at}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className={`fixed top-4 right-4 z-[60] px-4 py-2 rounded-md shadow-lg text-white font-roboto-slab ${
              notice.tone === 'success' ? 'bg-green-600' : notice.tone === 'error' ? 'bg-red-600' : 'bg-[#6e36aa]'
            }`}
          >
            {notice.message}
          </motion.div>
        )}
      </AnimatePresence>

      {!hidden && (
        <div
          className="fixed bottom-4 right-4 z-50 font-roboto-slab"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <AnimatePresence>
            {open && items.length > 0 && (
              <motion.div
                key="panel"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute bottom-16 right-0 w-[22rem] max-w-[calc(100vw-2rem)] bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                role="dialog"
                aria-label="Cart preview"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-[#6e36aa] text-white">
                  <span className="font-bold">
                    Your cart ({count} {count === 1 ? 'item' : 'items'})
                  </span>
                  <button
                    type="button"
                    aria-label="Close cart preview"
                    className="p-1 rounded hover:bg-white/20"
                    onClick={() => {
                      setOpen(false);
                      setPinned(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                  {items.map((line) => (
                    <li key={line.id} className="flex gap-3 px-4 py-3">
                      <img src={line.img} alt={line.name} className="w-14 h-14 rounded object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{line.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {line.company} {line.brand}
                          {line.size ? ` · Size ${line.size}` : ''}
                          {line.color ? ` · ${line.color}` : ''}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="inline-flex items-center border border-gray-300 rounded">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${line.name}`}
                              className="px-1.5 py-0.5 hover:bg-gray-100"
                              onClick={() => updateQty(line.id, line.qty - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold">{line.qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${line.name}`}
                              className="px-1.5 py-0.5 hover:bg-gray-100"
                              onClick={() => updateQty(line.id, line.qty + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-[#6e36aa]">{formatPrice(line.price * line.qty)}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.name} from cart`}
                        className="self-start p-1 text-gray-400 hover:text-[#eb432f]"
                        onClick={() => removeItem(line.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">{formatPrice(subtotal)}</span>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold py-2 rounded-md transition-colors"
                    onClick={() => navigate('/checkout')}
                  >
                    Checkout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            aria-label={count > 0 ? `Open cart, ${count} items` : 'Cart is empty, browse products'}
            aria-expanded={open}
            className="relative cursor-pointer bg-white p-3 rounded-full shadow-md border border-gray-200 block"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            onClick={toggle}
          >
            <ShoppingCart size={28} className="text-blue-600" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full min-w-[1.5rem] h-6 px-1 flex items-center justify-center text-xs font-bold"
                >
                  <motion.span
                    key={count}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {count > 99 ? '99+' : count}
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </>
  );
}
