"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  TrendingUp,
  Lock,
  LogOut,
  Edit2,
  Check,
  Eye,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Trash2,
  Camera,
  Filter
} from "lucide-react";
import { PRODUCTS, Product, formatPKR } from "@/data/products";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { user, login, logout, isAdmin } = useAuth();
  const [passkey, setPasskey] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "messages" | "subscribers">("orders");

  // Local state for managed products, orders, and messages
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [orders, setOrders] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productFilter, setProductFilter] = useState<"all" | "published" | "draft">("all");
  const [productSearch, setProductSearch] = useState("");

  // New product initial state
  const [newProductForm, setNewProductForm] = useState<Partial<Product>>({
    name: "",
    sku: "",
    tagline: "",
    category: "Classic Peshawari",
    categorySlug: "classic",
    price: 14500,
    originalPrice: 16000,
    stockCount: 12,
    color: "Traditional Brown",
    colorHex: "#7B3F00",
    leatherType: "Full-Grain Bovine Leather",
    soleType: "Hand-Cut Tyre Tread Sole",
    status: "draft",
    photoStatus: "awaiting_studio_assets",
  });

  // Load persisted store data
  const loadStoreData = () => {
    try {
      // Orders
      const savedOrders = JSON.parse(localStorage.getItem("drun_orders") || "[]");
      setOrders(savedOrders);

      // Messages
      const savedMessages = JSON.parse(localStorage.getItem("drun_messages") || "[]");
      setMessages(savedMessages);

      // Newsletter
      const savedNewsletter = JSON.parse(localStorage.getItem("drun_newsletter") || "[]");
      setSubscribers(savedNewsletter);

      // Products override with merge to ensure all 29 items are available
      const savedProducts = localStorage.getItem("drun_managed_products");
      if (savedProducts) {
        const parsed: Product[] = JSON.parse(savedProducts);
        const merged = PRODUCTS.map((p) => {
          const override = parsed.find((o) => o.id === p.id);
          return override ? { ...p, ...override } : p;
        });
        // Include any newly custom-created products from admin
        const customAdded = parsed.filter((p) => !PRODUCTS.some((base) => base.id === p.id));
        setProductList([...merged, ...customAdded]);
      } else {
        setProductList(PRODUCTS);
      }
    } catch (e) {
      console.error(e);
      setProductList(PRODUCTS);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, []);

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === "drun2026" || passkey === "admin" || passkey.toLowerCase() === "drun") {
      login("admin@drun.pk", "Master Cobbler & Admin", "admin");
      setAuthError("");
    } else {
      setAuthError("Invalid master security passkey.");
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem("drun_orders", JSON.stringify(updated));
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = productList.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    );
    setProductList(updated);
    localStorage.setItem("drun_managed_products", JSON.stringify(updated));
    setEditingProduct(null);
  };

  const handleToggleProductStatus = (productId: string) => {
    const updated = productList.map((p) => {
      if (p.id === productId) {
        const nextStatus = p.status === "published" ? "draft" : "published";
        return { ...p, status: nextStatus as "published" | "draft" };
      }
      return p;
    });
    setProductList(updated);
    localStorage.setItem("drun_managed_products", JSON.stringify(updated));
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to archive this footwear product from the catalogue?")) {
      const updated = productList.filter((p) => p.id !== productId);
      setProductList(updated);
      localStorage.setItem("drun_managed_products", JSON.stringify(updated));
    }
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name) return;

    const newId = "drun-" + (productList.length + 1).toString().padStart(2, "0");
    const slug = newProductForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const created: Product = {
      id: newId,
      sku: newProductForm.sku || `DRN-NEW-${Math.floor(100 + Math.random() * 900)}`,
      name: newProductForm.name,
      slug: slug,
      tagline: newProductForm.tagline || "Handcrafted luxury Peshawari chappal",
      category: (newProductForm.category as any) || "Classic Peshawari",
      categorySlug: (newProductForm.categorySlug as any) || "classic",
      brand: "Drun.",
      price: Number(newProductForm.price) || 14500,
      originalPrice: Number(newProductForm.originalPrice) || 16000,
      inStock: true,
      stockCount: Number(newProductForm.stockCount) || 10,
      status: (newProductForm.status as any) || "draft",
      photoStatus: (newProductForm.photoStatus as any) || "awaiting_studio_assets",
      image: "/products/charsadda-modern-black.png",
      additionalImages: ["/products/charsadda-modern-black.png"],
      imageAlt: `${newProductForm.name} Benchmark Cut`,
      imageRights: "Drun. Authorized Merchandise",
      leatherType: newProductForm.leatherType || "Full-Grain Bovine Leather",
      soleType: newProductForm.soleType || "Hand-Cut Tyre Tread Sole",
      footwearStyle: "Bespoke Cut",
      color: newProductForm.color || "Traditional Brown",
      colorHex: newProductForm.colorHex || "#7B3F00",
      sizes: [39, 40, 41, 42, 43, 44, 45],
      rating: 5.0,
      reviewCount: 0,
      featured: false,
      isNew: true,
      isSignature: false,
      weight: "850g per pair",
      description: "Custom artisanal footwear crafted to order by master cobblers in Peshawar.",
      craftDetails: [
        "100% full-grain bovine leather",
        "Hand-welted tyre sole construction",
        "Waxed linen saddle stitching"
      ],
      careInstructions: [
        "Wipe clean with a dry cotton cloth after daily wear",
        "Condition with natural beeswax cream"
      ],
      deliveryInfo: "Complimentary express courier across Pakistan (2–4 business days).",
      returnPolicy: "14-day complimentary size exchange in original luxury box."
    };

    const updated = [created, ...productList];
    setProductList(updated);
    localStorage.setItem("drun_managed_products", JSON.stringify(updated));
    setIsAddingNew(false);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const publishedCount = productList.filter((p) => p.status === "published").length;
  const draftCount = productList.filter((p) => p.status === "draft").length;

  const filteredInventory = productList.filter((p) => {
    if (productFilter === "published" && p.status !== "published") return false;
    if (productFilter === "draft" && p.status !== "draft") return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (!isAdmin && user?.role !== "admin") {
    return (
      <main className="min-h-screen bg-[#031A16] text-[#F6F5F0] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#07100E] border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FA9D60]/20 text-[#FA9D60] flex items-center justify-center mb-6">
            <Lock size={28} />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#FA9D60] font-medium block mb-1">
            Restricted Staff Area
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
            Drun Admin Console
          </h1>
          <p className="text-xs text-[#9EAAA4] mb-8 font-normal">
            Enter the master administrator passkey to access inventory, catalog controls, orders, and sales telemetry.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey (default: drun2026)"
                className="w-full bg-[#08231D] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
              />
            </div>
            <button
              type="submit"
              className="btn-copper-pill w-full py-3.5 text-xs uppercase tracking-wider font-semibold"
            >
              Authenticate Admin
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs text-[#9EAAA4]">
            <Link href="/" className="hover:text-white transition-colors">
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#031A16] text-[#F6F5F0]">
      {/* Admin Top Header */}
      <header className="bg-[#07100E] border-b border-white/10 py-4 px-6 md:px-12 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              drun<span className="text-[#FA9D60]">.</span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FA9D60]/20 text-[#FA9D60] text-[10px] font-mono uppercase tracking-wider border border-[#FA9D60]/30">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#9EAAA4] hover:text-white transition-colors hidden sm:inline"
            >
              View Live Storefront &rarr;
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#9EAAA4] hover:text-white transition-all"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Metric Cards (Real numbers from orders & catalog) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#07100E] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start text-[#9EAAA4] mb-2">
              <span className="text-xs uppercase tracking-wider">Total Sales</span>
              <TrendingUp size={16} className="text-[#FA9D60]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-[#FA9D60]">
              PKR {totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#9EAAA4] mt-1">From confirmed orders</div>
          </div>

          <div className="bg-[#07100E] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start text-[#9EAAA4] mb-2">
              <span className="text-xs uppercase tracking-wider">Active Orders</span>
              <ShoppingBag size={16} className="text-[#FA9D60]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {activeOrdersCount}
            </div>
            <div className="text-[11px] text-[#9EAAA4] mt-1">{orders.length} total orders recorded</div>
          </div>

          <div className="bg-[#07100E] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start text-[#9EAAA4] mb-2">
              <span className="text-xs uppercase tracking-wider">Total Catalog</span>
              <Package size={16} className="text-[#FA9D60]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {productList.length} Designs
            </div>
            <div className="text-[11px] text-[#9EAAA4] mt-1">
              <span className="text-emerald-400">{publishedCount} Published</span> &bull;{" "}
              <span className="text-amber-400">{draftCount} Drafts</span>
            </div>
          </div>

          <div className="bg-[#07100E] border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-start text-[#9EAAA4] mb-2">
              <span className="text-xs uppercase tracking-wider">Patron Inquiries</span>
              <MessageSquare size={16} className="text-[#FA9D60]" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-bold text-white">
              {messages.length}
            </div>
            <div className="text-[11px] text-[#9EAAA4] mt-1">{subscribers.length} newsletter patrons</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 mb-8 gap-4 overflow-x-auto text-xs uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-[#FA9D60] text-[#FA9D60]"
                : "border-transparent text-[#9EAAA4] hover:text-white"
            }`}
          >
            <ShoppingBag size={14} />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "products"
                ? "border-[#FA9D60] text-[#FA9D60]"
                : "border-transparent text-[#9EAAA4] hover:text-white"
            }`}
          >
            <Package size={14} />
            <span>Catalog & Inventory ({productList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "messages"
                ? "border-[#FA9D60] text-[#FA9D60]"
                : "border-transparent text-[#9EAAA4] hover:text-white"
            }`}
          >
            <MessageSquare size={14} />
            <span>Contact Messages ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("subscribers")}
            className={`pb-3 font-semibold transition-all border-b-2 flex items-center gap-2 ${
              activeTab === "subscribers"
                ? "border-[#FA9D60] text-[#FA9D60]"
                : "border-transparent text-[#9EAAA4] hover:text-white"
            }`}
          >
            <Users size={14} />
            <span>Subscribers ({subscribers.length})</span>
          </button>
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === "orders" && (
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              Customer Orders
            </h2>

            {orders.length === 0 ? (
              <div className="text-center py-16 text-[#9EAAA4] text-xs">
                No orders placed yet. Place an order on the storefront to test live telemetry.
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {orders.map((order) => (
                  <div key={order.id} className="py-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-[#FA9D60]">
                            {order.id}
                          </span>
                          <span className="text-xs text-[#9EAAA4]">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-white mt-1">
                          {order.customer.fullName} &bull; {order.customer.phone} &bull; {order.customer.city}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-[#08231D] border border-white/15 rounded-full px-3 py-1.5 text-xs text-white outline-none focus:border-[#FA9D60]"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Bench Work">Bench Work</option>
                          <option value="Dispatched (TCS)">Dispatched (TCS)</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <span className="font-heading text-xl font-bold text-[#FA9D60]">
                          PKR {order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#08231D]/40 p-4 rounded-xl text-xs space-y-2">
                      <div className="text-[#9EAAA4]">
                        Address: {order.customer.address}, {order.customer.city}, {order.customer.province}
                      </div>
                      <div className="text-[#9EAAA4]">
                        Payment: {order.customer.paymentMethod.toUpperCase()}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                        {order.items.map((item: any) => (
                          <span
                            key={item.id}
                            className="px-2.5 py-1 rounded bg-[#07100E] text-white border border-white/10"
                          >
                            {item.product.name} (EU {item.size}) &times; {item.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Product Inventory Management (Phase 8 full control) */}
        {activeTab === "products" && (
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Footwear Catalog & Inventory
                </h2>
                <p className="text-xs text-[#9EAAA4] mt-0.5">
                  Manage prices in PKR, stock counts, publication status, and studio photography assets.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="btn-copper-pill px-4 py-2 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Sub-bar: Filter by Status & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProductFilter("all")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    productFilter === "all"
                      ? "bg-[#FA9D60] text-[#101412] font-semibold"
                      : "bg-[#08231D] text-[#9EAAA4] hover:text-white"
                  }`}
                >
                  All ({productList.length})
                </button>
                <button
                  onClick={() => setProductFilter("published")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    productFilter === "published"
                      ? "bg-emerald-500 text-[#101412] font-semibold"
                      : "bg-[#08231D] text-[#9EAAA4] hover:text-white"
                  }`}
                >
                  Published ({publishedCount})
                </button>
                <button
                  onClick={() => setProductFilter("draft")}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    productFilter === "draft"
                      ? "bg-amber-500 text-[#101412] font-semibold"
                      : "bg-[#08231D] text-[#9EAAA4] hover:text-white"
                  }`}
                >
                  Draft Awaiting Shoot ({draftCount})
                </button>
              </div>

              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter by name, SKU..."
                  className="w-full bg-[#08231D] border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#9EAAA4] outline-none focus:border-[#FA9D60]"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9EAAA4]" />
              </div>
            </div>

            {/* Products Table / List */}
            <div className="divide-y divide-white/10">
              {filteredInventory.map((product) => (
                <div
                  key={product.id}
                  className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#08231D] p-2 flex items-center justify-center shrink-0 border border-white/5">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading text-base font-semibold text-white">
                          {product.name}
                        </h3>
                        <span className="font-mono text-[10px] text-[#9EAAA4] bg-white/5 px-2 py-0.5 rounded">
                          {product.sku}
                        </span>
                        {product.status === "published" ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                            Published
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                            Draft (Awaiting Shoot)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#9EAAA4] mt-0.5">
                        {product.category} &bull; {product.leatherType}
                      </div>
                      <div className="text-xs text-[#FA9D60] font-mono mt-0.5 flex items-center gap-3">
                        <span>Stock: {product.stockCount} pairs</span>
                        <span>Color: {product.color}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-auto">
                    <span className="font-heading text-lg font-bold text-white">
                      {formatPKR(product.price)}
                    </span>

                    <button
                      onClick={() => handleToggleProductStatus(product.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors border ${
                        product.status === "published"
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                      }`}
                      title="Toggle publication status"
                    >
                      {product.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 rounded-full bg-white/5 hover:bg-[#FA9D60] text-[#9EAAA4] hover:text-[#101412] transition-colors"
                      aria-label="Edit product"
                    >
                      <Edit2 size={15} />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 rounded-full bg-white/5 hover:bg-red-500 text-[#9EAAA4] hover:text-white transition-colors"
                      aria-label="Archive product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
                <div className="bg-[#07100E] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl my-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-1">
                    Edit {editingProduct.name}
                  </h3>
                  <p className="text-xs text-[#9EAAA4] mb-6">SKU: {editingProduct.sku}</p>

                  <form onSubmit={handleSaveProductEdit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Selling Price (PKR) *
                        </label>
                        <input
                          type="number"
                          required
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Original Price (PKR)
                        </label>
                        <input
                          type="number"
                          value={editingProduct.originalPrice || ""}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              originalPrice: Number(e.target.value) || undefined,
                            })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Stock Count (Pairs) *
                        </label>
                        <input
                          type="number"
                          required
                          value={editingProduct.stockCount}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              stockCount: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Publication Status *
                        </label>
                        <select
                          value={editingProduct.status}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              status: e.target.value as "published" | "draft",
                            })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft (Awaiting Assets)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                        Product Tagline
                      </label>
                      <input
                        type="text"
                        value={editingProduct.tagline}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, tagline: e.target.value })
                        }
                        className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                        Photo Status
                      </label>
                      <select
                        value={editingProduct.photoStatus}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            photoStatus: e.target.value as "verified" | "awaiting_studio_assets",
                          })
                        }
                        className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                      >
                        <option value="verified">Verified Studio Photography</option>
                        <option value="awaiting_studio_assets">Awaiting Studio Assets</option>
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="flex-1 py-2.5 rounded-full border border-white/20 text-[#9EAAA4] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-copper-pill flex-1 py-2.5 font-semibold">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add New Product Modal */}
            {isAddingNew && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
                <div className="bg-[#07100E] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl my-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">
                    Add New Footwear Design
                  </h3>
                  <p className="text-xs text-[#9EAAA4] mb-6">
                    Enter the footwear specifications to add it to the Drun atelier catalog.
                  </p>

                  <form onSubmit={handleCreateNewProduct} className="space-y-4 text-xs">
                    <div>
                      <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProductForm.name}
                        onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                        placeholder="e.g. The Charsadda Royal Tan"
                        className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Collection Category *
                        </label>
                        <select
                          value={newProductForm.category}
                          onChange={(e) => {
                            const val = e.target.value;
                            let slug = "classic";
                            if (val.includes("Kaptaan")) slug = "kaptaan";
                            else if (val.includes("Norozi")) slug = "norozi";
                            else if (val.includes("Modern")) slug = "modern";
                            setNewProductForm({
                              ...newProductForm,
                              category: val as any,
                              categorySlug: slug as any,
                            });
                          }}
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        >
                          <option value="Classic Peshawari">Classic Peshawari</option>
                          <option value="Kaptaan Style">Kaptaan Style</option>
                          <option value="Norozi Style">Norozi Style</option>
                          <option value="Modern & Signature">Modern & Signature</option>
                        </select>
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Selling Price (PKR) *
                        </label>
                        <input
                          type="number"
                          required
                          value={newProductForm.price}
                          onChange={(e) =>
                            setNewProductForm({ ...newProductForm, price: Number(e.target.value) })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Color / Tone
                        </label>
                        <input
                          type="text"
                          value={newProductForm.color}
                          onChange={(e) => setNewProductForm({ ...newProductForm, color: e.target.value })}
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#9EAAA4] mb-1">
                          Initial Stock (Pairs)
                        </label>
                        <input
                          type="number"
                          value={newProductForm.stockCount}
                          onChange={(e) =>
                            setNewProductForm({
                              ...newProductForm,
                              stockCount: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#08231D] border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FA9D60]"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="flex-1 py-2.5 rounded-full border border-white/20 text-[#9EAAA4] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-copper-pill flex-1 py-2.5 font-semibold">
                        Add to Catalogue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Contact Messages */}
        {activeTab === "messages" && (
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              Concierge Inquiries
            </h2>
            {messages.length === 0 ? (
              <div className="text-center py-16 text-[#9EAAA4] text-xs">
                No patron inquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-white/10 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="py-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-semibold text-white">{msg.name}</div>
                        <div className="text-xs text-[#9EAAA4]">{msg.email} &bull; {msg.phone || "No phone"}</div>
                      </div>
                      <span className="text-[10px] text-[#FA9D60] uppercase tracking-wider font-mono">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-xs text-[#FA9D60] font-medium">{msg.subject}</div>
                    <p className="text-xs text-[#E9E8DF] bg-[#08231D]/40 p-3 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Newsletter Subscribers */}
        {activeTab === "subscribers" && (
          <div className="bg-[#07100E] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              Newsletter Subscribers
            </h2>
            {subscribers.length === 0 ? (
              <div className="text-center py-16 text-[#9EAAA4] text-xs">
                No newsletter subscribers recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {subscribers.map((email, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center text-xs">
                    <span className="text-white font-mono">{email}</span>
                    <span className="text-[#FA9D60]">Active Patron</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
