import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Package,
  ShoppingBag,
  Image as ImageIcon,
  Timer,
  Megaphone,
  Trash2,
  Plus,
  Upload,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Search,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSite, Order, OrderStatus } from "@/lib/SiteContext";
import { Product } from "@/data/products";

const ADMIN_USER = "rayan5678#";
const ADMIN_PASS = "huzaifa5678#";
const SESSION_KEY = "desicart_admin_session";

type Tab = "orders" | "products" | "hero" | "sale" | "promo";

// ---------------- Login Screen ----------------
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-br from-primary to-red-900 p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-1">DesiCart Admin</h1>
          <p className="text-white/70 text-sm">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-4">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <Label htmlFor="adm-user">Username</Label>
            <Input
              id="adm-user"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adm-pass">Password</Label>
            <div className="relative">
              <Input
                id="adm-pass"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-base font-semibold">
            <Lock className="w-4 h-4 mr-2" />
            Login to Admin Panel
          </Button>

          <button
            type="button"
            onClick={() => setLocation("/")}
            className="w-full text-center text-xs text-gray-500 hover:text-gray-800 mt-2"
          >
            ← Back to store
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ---------------- Orders Tab ----------------
function OrdersTab() {
  const { orders, updateOrderStatus, deleteOrder } = useSite();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.city.toLowerCase().includes(q)
      );
    });
  }, [orders, filter, search]);

  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((acc, o) => acc + o.total, 0);
    return {
      total: orders.length,
      newCount: orders.filter((o) => o.status === "new").length,
      processing: orders.filter((o) => o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed").length,
      revenue: totalRevenue,
    };
  }, [orders]);

  const statusBadge = (status: OrderStatus) => {
    switch (status) {
      case "new":
        return { label: "New", color: "bg-blue-100 text-blue-700", icon: Clock };
      case "processing":
        return { label: "Processing", color: "bg-yellow-100 text-yellow-800", icon: Clock };
      case "completed":
        return { label: "Completed", color: "bg-green-100 text-green-700", icon: CheckCircle2 };
      case "cancelled":
        return { label: "Cancelled", color: "bg-red-100 text-red-700", icon: XCircle };
    }
  };

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total Orders" value={stats.total} accent="bg-gray-100 text-gray-800" />
        <StatCard label="New" value={stats.newCount} accent="bg-blue-100 text-blue-700" />
        <StatCard label="Processing" value={stats.processing} accent="bg-yellow-100 text-yellow-700" />
        <StatCard
          label="Revenue"
          value={`Rs. ${stats.revenue.toLocaleString()}`}
          accent="bg-green-100 text-green-700"
          small
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, name, phone, city..."
            className="pl-9 h-11"
          />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <SelectTrigger className="sm:w-[180px] h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-dashed rounded-2xl p-10 text-center">
          <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No orders found.</p>
          <p className="text-gray-400 text-sm mt-1">
            Orders placed via WhatsApp checkout will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const badge = statusBadge(order.status);
            const Icon = badge.icon;
            const isOpen = openId === order.id;
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : order.id)}
                  className="w-full text-left p-4 md:p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold font-mono text-sm">{order.id}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${badge.color}`}>
                          <Icon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1 font-medium">{order.customer.fullName}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {new Date(order.createdAt).toLocaleString()} · {order.items.length} item(s) · {order.paymentMethod}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">Rs. {order.total.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-500">{isOpen ? "Hide details" : "View details"}</div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && <OrderDetails order={order} onStatusChange={updateOrderStatus} onDelete={deleteOrder} />}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OrderDetails({
  order,
  onStatusChange,
  onDelete,
}: {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden border-t border-gray-100"
    >
      <div className="p-4 md:p-5 grid md:grid-cols-2 gap-5 bg-gray-50">
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Customer</h4>
          <p className="font-semibold">{order.customer.fullName}</p>
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" /> {order.customer.phone}
          </p>
          <p className="text-sm text-gray-700 flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>{order.customer.address}, {order.customer.city}</span>
          </p>
          {order.customer.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs text-yellow-900">
              <span className="font-bold">Note: </span>{order.customer.notes}
            </div>
          )}

          <div className="pt-3">
            <Label className="text-xs">Update Status</Label>
            <Select value={order.status} onValueChange={(v) => onStatusChange(order.id, v as OrderStatus)}>
              <SelectTrigger className="h-10 mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 font-bold">Items</h4>
          <div className="space-y-2">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3 bg-white p-2 rounded-lg border">
                <img src={it.image} alt="" className="w-10 h-10 object-contain mix-blend-multiply" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{it.name}</p>
                  <p className="text-xs text-gray-500">{it.quantity} × Rs. {it.price.toLocaleString()}</p>
                </div>
                <p className="text-sm font-semibold whitespace-nowrap">Rs. {it.lineTotal.toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            {order.onlineDiscount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>Online Discount</span>
                <span>- Rs. {order.onlineDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-1">
              <span>Total</span>
              <span className="text-primary">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={() => {
              if (confirm(`Delete order ${order.id}? This cannot be undone.`)) {
                onDelete(order.id);
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Order
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  label,
  value,
  accent,
  small,
}: {
  label: string;
  value: string | number;
  accent: string;
  small?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${accent}`}>
        {label}
      </span>
      <div className={`mt-2 font-bold text-gray-900 ${small ? "text-base md:text-lg" : "text-2xl"}`}>
        {value}
      </div>
    </div>
  );
}

// ---------------- Products Tab ----------------
function ProductsTab() {
  const { products, updateProduct, deleteProduct, addProduct } = useSite();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          !search.trim() ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, search],
  );

  const handleAddNew = () => {
    const id = `p-${Date.now()}`;
    const blank: Product = {
      id,
      slug: `new-product-${id.slice(-4)}`,
      name: "New Product",
      category: "Earbuds",
      price: 0,
      originalPrice: 0,
      discountPercent: 0,
      rating: 4.5,
      reviewCount: 0,
      badge: "New",
      images: ["/images/earbuds-1.png"],
      shortDescription: "Describe your product here.",
      features: [],
      inStock: true,
    };
    addProduct(blank);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-11"
          />
        </div>
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90 text-white h-11">
          <Plus className="w-4 h-4 mr-1" />
          Add New Product
        </Button>
      </div>

      <div className="space-y-3">
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} onUpdate={updateProduct} onDelete={deleteProduct} />
        ))}
      </div>
    </div>
  );
}

function ProductRow({
  product,
  onUpdate,
  onDelete,
}: {
  product: Product;
  onUpdate: (id: string, patch: Partial<Product>) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Product>(product);
  const [newImageUrl, setNewImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(product);
    setNewImageUrl("");
  }, [product, open]);

  const readFileAsDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const onPickImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const dataUrls = await Promise.all(files.map(readFileAsDataUrl));
    setDraft((d) => ({ ...d, images: [...d.images, ...dataUrls] }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setDraft((d) => ({ ...d, images: [...d.images, url] }));
    setNewImageUrl("");
  };

  const removeImage = (idx: number) => {
    setDraft((d) => {
      const next = d.images.filter((_, i) => i !== idx);
      return { ...d, images: next.length ? next : ["/images/earbuds-1.png"] };
    });
  };

  const setMainImage = (idx: number) => {
    setDraft((d) => {
      if (idx === 0) return d;
      const next = [...d.images];
      const [picked] = next.splice(idx, 1);
      return { ...d, images: [picked, ...next] };
    });
  };

  const save = () => {
    const patch: Partial<Product> = {
      ...draft,
      price: Number(draft.price) || 0,
      originalPrice: Number(draft.originalPrice) || 0,
      discountPercent:
        Number(draft.originalPrice) > 0 && Number(draft.price) >= 0
          ? Math.max(0, Math.round((1 - Number(draft.price) / Number(draft.originalPrice)) * 100))
          : 0,
    };
    onUpdate(product.id, patch);
    setOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-3 md:p-4 flex items-center gap-3">
        <img src={product.images[0]} alt="" className="w-14 h-14 object-contain mix-blend-multiply bg-gray-50 rounded-lg p-1" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{product.name}</p>
          <p className="text-xs text-gray-500 truncate">
            {product.category} · Rs. {product.price.toLocaleString()}
            {product.originalPrice > product.price && (
              <span className="line-through ml-2">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
            {!product.inStock && <span className="ml-2 text-red-600 font-semibold">OUT OF STOCK</span>}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Edit"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 border-red-200 hover:bg-red-50"
          onClick={() => {
            if (confirm(`Delete product "${product.name}"?`)) onDelete(product.id);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t bg-gray-50"
          >
            <div className="p-4 md:p-5 grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label>Name</Label>
                  <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Category</Label>
                    <Select value={draft.category} onValueChange={(v) => setDraft({ ...draft, category: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Earbuds">Earbuds</SelectItem>
                        <SelectItem value="Smart Watches">Smart Watches</SelectItem>
                        <SelectItem value="Headphones">Headphones</SelectItem>
                        <SelectItem value="Speakers">Speakers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Badge</Label>
                    <Select
                      value={draft.badge ?? "none"}
                      onValueChange={(v) =>
                        setDraft({ ...draft, badge: v === "none" ? null : (v as Product["badge"]) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Bestseller">Bestseller</SelectItem>
                        <SelectItem value="Sale">Sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Sale Price (Rs.)</Label>
                    <Input
                      type="number"
                      value={draft.price}
                      onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Original Price (Rs.)</Label>
                    <Input
                      type="number"
                      value={draft.originalPrice}
                      onChange={(e) => setDraft({ ...draft, originalPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <Textarea
                    value={draft.shortDescription}
                    onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
                    className="min-h-[70px] resize-none"
                  />
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border">
                  <Label className="m-0 cursor-pointer">In Stock</Label>
                  <Switch
                    checked={draft.inStock}
                    onCheckedChange={(v) => setDraft({ ...draft, inStock: v })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="m-0">Product Images ({draft.images.length})</Label>
                  <span className="text-[10px] text-gray-500">First image = main</span>
                </div>

                {/* Image gallery grid */}
                <div className="grid grid-cols-3 gap-2">
                  {draft.images.map((src, idx) => (
                    <div
                      key={`${idx}-${src.slice(0, 30)}`}
                      className={`group relative aspect-square bg-white rounded-xl border-2 overflow-hidden ${
                        idx === 0 ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <img src={src} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 bg-primary text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded">
                          Main
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => setMainImage(idx)}
                            className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded hover:bg-primary hover:text-white"
                            title="Set as main"
                          >
                            Set Main
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                          title="Remove image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add slot */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="aspect-square bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-primary transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">Add Photos</span>
                  </button>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={onPickImages}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Multiple Images
                </Button>

                <div>
                  <Label className="text-xs">Or paste image URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addImageUrl();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addImageUrl}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Slug (URL)</Label>
                  <Input value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button onClick={save} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Hero Tab ----------------
function HeroTab() {
  const { hero, updateHero } = useSite();
  const [draft, setDraft] = useState(hero);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(hero), [hero]);

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setDraft((d) => ({ ...d, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const save = () => {
    updateHero(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-5 bg-white p-5 rounded-2xl border">
      <div className="space-y-3">
        <div>
          <Label>Badge Text</Label>
          <Input value={draft.badge} onChange={(e) => setDraft({ ...draft, badge: e.target.value })} />
        </div>
        <div>
          <Label>Title (use Enter for new line)</Label>
          <Textarea
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="min-h-[80px] resize-none"
          />
        </div>
        <div>
          <Label>Subtitle</Label>
          <Textarea
            value={draft.subtitle}
            onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
            className="min-h-[70px] resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Button Label</Label>
            <Input value={draft.ctaLabel} onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })} />
          </div>
          <div>
            <Label>Button Link</Label>
            <Input value={draft.ctaLink} onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })} />
          </div>
        </div>
        <Button onClick={save} className="bg-primary hover:bg-primary/90 text-white">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save Hero Settings"}
        </Button>
      </div>

      <div className="space-y-3">
        <Label>Hero Image</Label>
        <div className="aspect-square bg-[#fdfaf5] rounded-xl border flex items-center justify-center overflow-hidden">
          <img src={draft.image} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload New Image
          </Button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPickImage} />
        </div>
        <Input
          value={draft.image}
          onChange={(e) => setDraft({ ...draft, image: e.target.value })}
          placeholder="Or paste image URL"
        />
      </div>
    </div>
  );
}

// ---------------- Sale Timer Tab ----------------
function SaleTab() {
  const { sale, updateSale } = useSite();
  const [draft, setDraft] = useState(sale);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(sale), [sale]);

  // Convert epoch ms to local datetime-local string
  const toLocalInput = (ts: number) => {
    const d = new Date(ts);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const save = () => {
    updateSale(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border space-y-4 max-w-2xl">
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border">
        <div>
          <p className="font-semibold">Show Sale Timer on Home</p>
          <p className="text-xs text-gray-500">Toggle the flash sale countdown banner</p>
        </div>
        <Switch checked={draft.enabled} onCheckedChange={(v) => setDraft({ ...draft, enabled: v })} />
      </div>

      <div>
        <Label>Title</Label>
        <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
      </div>
      <div>
        <Label>Subtitle</Label>
        <Input value={draft.subtitle} onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })} />
      </div>
      <div>
        <Label>Sale Ends At</Label>
        <Input
          type="datetime-local"
          value={toLocalInput(draft.endsAt)}
          onChange={(e) => setDraft({ ...draft, endsAt: new Date(e.target.value).getTime() })}
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={save} className="bg-primary hover:bg-primary/90 text-white">
          <Save className="w-4 h-4 mr-2" />
          {saved ? "Saved!" : "Save Sale Settings"}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setDraft({ ...draft, endsAt: Date.now() + 1000 * 60 * 60 * 24 * 2 })
          }
        >
          Reset to +2 days
        </Button>
      </div>
    </div>
  );
}

// ---------------- Promo Bar Tab ----------------
function PromoTab() {
  const { promoMessages, updatePromoMessages } = useSite();
  const [draft, setDraft] = useState(promoMessages.join("\n"));
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(promoMessages.join("\n")), [promoMessages]);

  const save = () => {
    const lines = draft
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    updatePromoMessages(lines.length ? lines : ["Welcome to DesiCart"]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border space-y-4 max-w-2xl">
      <div>
        <Label>Promo Bar Messages (one per line)</Label>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-h-[160px] font-mono text-sm"
          placeholder="🎉 Free Delivery&#10;🔥 Flash Sale Live"
        />
        <p className="text-xs text-gray-500 mt-1">These messages scroll across the green bar at the top of every page.</p>
      </div>
      <Button onClick={save} className="bg-primary hover:bg-primary/90 text-white">
        <Save className="w-4 h-4 mr-2" />
        {saved ? "Saved!" : "Save Promo Messages"}
      </Button>
    </div>
  );
}

// ---------------- Main Admin Shell ----------------
const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "products", label: "Products", icon: Package },
  { id: "hero", label: "Hero Banner", icon: ImageIcon },
  { id: "sale", label: "Sale Timer", icon: Timer },
  { id: "promo", label: "Promo Bar", icon: Megaphone },
];

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("orders");
  const { resetAll } = useSite();
  const [, setLocation] = useLocation();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm md:text-base">DesiCart Admin</p>
              <p className="text-[11px] text-gray-500 truncate">Manage store, orders &amp; settings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/")}
              className="hidden sm:inline-flex"
            >
              View Store
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (confirm("Reset all products, orders, and settings to defaults?")) resetAll();
              }}
              className="hidden md:inline-flex text-amber-700 border-amber-200 hover:bg-amber-50"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-2 overflow-x-auto hide-scrollbar">
          <div className="flex gap-1 min-w-max">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-5 md:py-7">
        {tab === "orders" && <OrdersTab />}
        {tab === "products" && <ProductsTab />}
        {tab === "hero" && <HeroTab />}
        {tab === "sale" && <SaleTab />}
        {tab === "promo" && <PromoTab />}
      </main>
    </div>
  );
}
