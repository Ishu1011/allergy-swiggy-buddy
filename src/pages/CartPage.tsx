import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import BottomNavbar from '@/components/BottomNavbar';
import { Button } from '@/components/ui/button';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Your Cart</h1>
            <p className="text-sm text-muted-foreground">{totalItems} items</p>
          </div>
        </div>
      </header>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-center mb-6">
            Add some delicious dishes to get started!
          </p>
          <Button onClick={() => navigate('/home')} className="btn-primary">
            Browse Restaurants
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl p-4 swiggy-shadow flex gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  {item.image || item.image_url ? (
                    <img
                      src={item.image || item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      <ShoppingBag className="w-8 h-8 text-primary/40" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                  <p className="font-bold text-foreground mt-1">₹{item.price * item.quantity}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 bg-secondary rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-semibold text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart */}
          <div className="px-4">
            <button
              onClick={clearCart}
              className="text-destructive text-sm font-medium hover:underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Checkout Footer */}
          <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4 z-40">
            <div className="max-w-lg mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-foreground">₹{totalPrice}</p>
              </div>
              <Button
                className="btn-primary px-8"
                onClick={() => {
                  // TODO: Backend integration for checkout
                  // POST /api/orders with cart items
                  alert('Checkout functionality coming soon!');
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}

      <BottomNavbar />
    </div>
  );
};

export default CartPage;
