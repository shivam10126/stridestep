import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, Truck, CreditCard, Banknote } from 'lucide-react';
import Navbar from '../components/navbar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import {
  useCart,
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
  TAX_RATE,
  PROMO_CODES,
} from '../context/CartContext';

const readAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('authInfo')) || {};
  } catch {
    return {};
  }
};

const fieldClass = 'bg-white text-gray-900 border-gray-300 focus-visible:ring-[#6e36aa]';

const Field = ({ id, label, error, ...props }) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-gray-700 font-semibold">
      {label}
    </Label>
    <Input id={id} className={`${fieldClass} ${error ? 'border-[#eb432f]' : ''}`} aria-invalid={!!error} {...props} />
    {error && <p className="text-xs text-[#eb432f]">{error}</p>}
  </div>
);

export default function Checkout() {
  const { items, subtotal, count, updateQty, removeItem, placeOrder } = useCart();
  const navigate = useNavigate();
  const auth = useMemo(readAuth, []);

  const [form, setForm] = useState({
    fullName: auth.name || '',
    email: auth.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  const [errors, setErrors] = useState({});
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState(null);
  const [promoMsg, setPromoMsg] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const discount = promo ? subtotal * PROMO_CODES[promo] : 0;
  const afterDiscount = subtotal - discount;
  const shipping = items.length === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + shipping + tax;

  const update = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
    setErrors((prev) => (prev[id] ? { ...prev, [id]: undefined } : prev));
  };

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromo(code);
      setPromoMsg(`Code ${code} applied: ${Math.round(PROMO_CODES[code] * 100)}% off.`);
    } else {
      setPromo(null);
      setPromoMsg('That code is not valid.');
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = 'Enter a valid email';
    if (!/^[\d\s()+-]{7,}$/.test(form.phone.trim())) errs.phone = 'Enter a valid phone number';
    if (!form.address.trim()) errs.address = 'Required';
    if (!form.city.trim()) errs.city = 'Required';
    if (!form.state.trim()) errs.state = 'Required';
    if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.zip.trim())) errs.zip = 'Enter a valid postal code';
    if (!form.country.trim()) errs.country = 'Required';

    if (form.paymentMethod === 'card') {
      if (!form.cardName.trim()) errs.cardName = 'Required';
      const digits = form.cardNumber.replace(/\s+/g, '');
      if (!/^\d{13,19}$/.test(digits)) errs.cardNumber = 'Enter a valid card number';
      const m = form.cardExpiry.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);
      if (!m) {
        errs.cardExpiry = 'Use MM/YY';
      } else {
        const exp = new Date(2000 + Number(m[2]), Number(m[1]), 1);
        if (exp <= new Date()) errs.cardExpiry = 'Card has expired';
      }
      if (!/^\d{3,4}$/.test(form.cardCvc.trim())) errs.cardCvc = 'Enter the 3 or 4 digit code';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const order = placeOrder({
      promo,
      customer: { name: form.fullName.trim(), email: form.email.trim(), phone: form.phone.trim() },
      shippingAddress: {
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        zip: form.zip.trim(),
        country: form.country.trim(),
      },
      paymentMethod:
        form.paymentMethod === 'card'
          ? { type: 'card', last4: form.cardNumber.replace(/\s+/g, '').slice(-4) }
          : { type: 'cod' },
    });
    setPlacedOrder(order);
    window.scrollTo(0, 0);
  };

  if (placedOrder) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 font-roboto-slab">
          <CheckCircle2 className="w-20 h-20 text-green-600 mb-6" />
          <h1 className="text-4xl font-bold text-[#eb432f] mb-2">Thank you for your order!</h1>
          <p className="text-lg text-gray-700 mb-1">
            Order <span className="font-bold text-[#6e36aa]">{placedOrder.id}</span> has been placed.
          </p>
          <p className="text-gray-600 mb-8">
            A confirmation has been sent to {placedOrder.customer.email}. Total charged: {formatPrice(placedOrder.total)}.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#6e36aa] hover:bg-[#5b2b8f] text-white" onClick={() => navigate('/orders')}>
              View my orders
            </Button>
            <Button className="bg-[#eb432f] hover:bg-[#d13a2b] text-white" onClick={() => navigate('/search')}>
              Continue shopping
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 font-roboto-slab">
          <ShoppingBag className="w-20 h-20 text-[#6e36aa] mb-6" />
          <h1 className="text-3xl font-bold text-[#eb432f] mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add a few pairs and come back to check out.</p>
          <Link to="/search" className="bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold px-6 py-3 rounded-md transition-colors">
            Browse shoes
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 font-roboto-slab text-gray-900">
        <h1 className="text-3xl font-bold text-[#eb432f] mb-6">Checkout</h1>

        <form onSubmit={handleSubmit} noValidate className="grid lg:grid-cols-5 gap-8">
          {/* Left: details */}
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#6e36aa] mb-4">Contact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="fullName" label="Full name" value={form.fullName} onChange={update} error={errors.fullName} autoComplete="name" />
                <Field id="email" label="Email" type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" />
                <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" />
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#6e36aa] mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" /> Shipping address
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Field id="address" label="Street address" value={form.address} onChange={update} error={errors.address} autoComplete="street-address" />
                </div>
                <Field id="city" label="City" value={form.city} onChange={update} error={errors.city} autoComplete="address-level2" />
                <Field id="state" label="State / Province" value={form.state} onChange={update} error={errors.state} autoComplete="address-level1" />
                <Field id="zip" label="Postal code" value={form.zip} onChange={update} error={errors.zip} autoComplete="postal-code" />
                <Field id="country" label="Country" value={form.country} onChange={update} error={errors.country} autoComplete="country-name" />
              </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#6e36aa] mb-4">Payment</h2>
              <RadioGroup
                value={form.paymentMethod}
                onValueChange={(v) => setForm((f) => ({ ...f, paymentMethod: v }))}
                className="grid sm:grid-cols-2 gap-3 mb-4"
              >
                {[
                  { value: 'card', label: 'Credit / debit card', icon: CreditCard },
                  { value: 'cod', label: 'Cash on delivery', icon: Banknote },
                ].map(({ value, label, icon: Icon }) => (
                  <Label
                    key={value}
                    htmlFor={`pay-${value}`}
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                      form.paymentMethod === value ? 'border-[#6e36aa] bg-[#6e36aa]/5' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <RadioGroupItem value={value} id={`pay-${value}`} className="border-[#6e36aa] text-[#6e36aa]" />
                    <Icon className="w-5 h-5 text-[#6e36aa]" />
                    <span className="font-semibold">{label}</span>
                  </Label>
                ))}
              </RadioGroup>

              {form.paymentMethod === 'card' ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field id="cardName" label="Name on card" value={form.cardName} onChange={update} error={errors.cardName} autoComplete="cc-name" />
                  </div>
                  <div className="sm:col-span-2">
                    <Field
                      id="cardNumber"
                      label="Card number"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={update}
                      error={errors.cardNumber}
                      autoComplete="cc-number"
                    />
                  </div>
                  <Field id="cardExpiry" label="Expiry (MM/YY)" placeholder="MM/YY" value={form.cardExpiry} onChange={update} error={errors.cardExpiry} autoComplete="cc-exp" />
                  <Field id="cardCvc" label="CVC" inputMode="numeric" placeholder="123" value={form.cardCvc} onChange={update} error={errors.cardCvc} autoComplete="cc-csc" />
                  <p className="sm:col-span-2 text-xs text-gray-500">
                    This is a demo store. Card details are validated for format only and are never stored or charged.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">Pay in cash when your order arrives.</p>
              )}
            </section>
          </div>

          {/* Right: summary */}
          <aside className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm lg:sticky lg:top-6">
              <div className="px-6 py-4 bg-[#6e36aa] text-white rounded-t-xl font-bold">
                Order summary ({count} {count === 1 ? 'item' : 'items'})
              </div>
              <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {items.map((line) => (
                  <li key={line.id} className="flex gap-3 px-6 py-3">
                    <img src={line.img} alt={line.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{line.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {line.company} {line.brand}
                        {line.size ? ` · Size ${line.size}` : ''}
                        {line.color ? ` · ${line.color}` : ''}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="inline-flex items-center border border-gray-300 rounded">
                          <button type="button" aria-label={`Decrease quantity of ${line.name}`} className="px-1.5 py-0.5 hover:bg-gray-100" onClick={() => updateQty(line.id, line.qty - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{line.qty}</span>
                          <button type="button" aria-label={`Increase quantity of ${line.name}`} className="px-1.5 py-0.5 hover:bg-gray-100" onClick={() => updateQty(line.id, line.qty + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#6e36aa]">{formatPrice(line.price * line.qty)}</span>
                      </div>
                    </div>
                    <button type="button" aria-label={`Remove ${line.name} from cart`} className="self-start p-1 text-gray-400 hover:text-[#eb432f]" onClick={() => removeItem(line.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="px-6 py-4 border-t border-gray-200 space-y-3">
                <div className="flex gap-2">
                  <Input
                    aria-label="Promo code"
                    placeholder="Promo code (try WELCOME10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className={fieldClass}
                  />
                  <Button type="button" variant="outline" className="border-[#6e36aa] text-[#6e36aa] hover:bg-[#6e36aa] hover:text-white" onClick={applyPromo}>
                    Apply
                  </Button>
                </div>
                {promoMsg && <p className={`text-xs ${promo ? 'text-green-700' : 'text-[#eb432f]'}`}>{promoMsg}</p>}

                <dl className="text-sm space-y-1.5 pt-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <dt>Discount ({promo})</dt>
                      <dd>-{formatPrice(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax ({Math.round(TAX_RATE * 100)}%)</dt>
                    <dd>{formatPrice(tax)}</dd>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                    <dt>Total</dt>
                    <dd className="text-[#eb432f]">{formatPrice(total)}</dd>
                  </div>
                </dl>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - afterDiscount)} more for free shipping.
                  </p>
                )}

                <Button type="submit" className="w-full bg-[#eb432f] hover:bg-[#d13a2b] text-white font-bold h-11">
                  Place order · {formatPrice(total)}
                </Button>
                <Link to="/search" className="block text-center text-sm text-[#6e36aa] hover:underline">
                  Continue shopping
                </Link>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </>
  );
}
