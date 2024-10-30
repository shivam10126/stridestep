import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

export default function Cart({Count}) {
  const [itemCount, setItemCount] = useState(Count);
  const [notification, setNotification] = useState(null);


 



  useEffect(() => {
    // console.log("storedCart: ",Count);
    setItemCount(Count)
    showNotification('Cart updated!', 'green')
  }, [Count]);

  // Function to display notification
  const showNotification = (message, color) => {
    setNotification({ message, color });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className={`fixed top-4 right-4 ${notification.color === 'green' ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md shadow-lg z-50`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 flex items-center space-x-2">
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 15,
            duration: 0.3,
          }}
        >
          <div className="bg-white p-3 rounded-full shadow-md">
            <ShoppingCart size={28} className="text-blue-600" />
          </div>
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                key="badge"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-2 bg-orange-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
              >
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                >
                  {itemCount}
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
