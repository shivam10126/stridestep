import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Package } from 'lucide-react';
import Navbar from '../components/navbar';
import { useCart, formatPrice } from '../context/CartContext';

const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

export default function Orders() {
  const { orders } = useCart();

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 font-roboto-slab text-gray-900">
        <h1 className="text-3xl font-bold text-[#eb432f] mb-6 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-[#6e36aa]" /> Previous orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-[#6e36aa] mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link to="/search" className="bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold px-6 py-3 rounded-md transition-colors">
              Start shopping
            </Link>
          </div>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 bg-[#6e36aa] text-white">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-sm text-white/80">{formatDate(order.placedAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{order.status}</p>
                    <p className="font-bold">{formatPrice(order.total)}</p>
                  </div>
                </div>
                <ul className="divide-y divide-gray-100">
                  {order.items.map((line) => (
                    <li key={line.id} className="flex items-center gap-4 px-6 py-3">
                      <img src={line.img} alt={line.name} className="w-14 h-14 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{line.name}</p>
                        <p className="text-xs text-gray-500">
                          {line.company} {line.brand}
                          {line.size ? ` · Size ${line.size}` : ''}
                          {line.color ? ` · ${line.color}` : ''}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">× {line.qty}</p>
                      <p className="font-semibold text-[#6e36aa] w-20 text-right">{formatPrice(line.price * line.qty)}</p>
                    </li>
                  ))}
                </ul>
                <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
                  <span>
                    Ship to: {order.shippingAddress?.address}, {order.shippingAddress?.city} {order.shippingAddress?.zip}
                  </span>
                  <span>
                    Paid by: {order.paymentMethod?.type === 'card' ? `Card ending ${order.paymentMethod.last4}` : 'Cash on delivery'}
                  </span>
                  {order.discount > 0 && <span>Discount: -{formatPrice(order.discount)}</span>}
                  <span>Shipping: {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
