import { useState, useEffect } from 'react';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProductsTable } from '../components/ui/ProductsTable';
import { ProductFormModal, Product, ProductFormData } from '../components/ui/ProductFormModal';

export function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            } else {
                setError('Failed to fetch products');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle create/update
    const handleSubmit = async (formData: ProductFormData) => {
        setSaving(true);
        try {
            const url = editingProduct
                ? `/api/admin/products/${editingProduct.id}`
                : '/api/admin/products';

            const method = editingProduct ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
                }),
            });

            const data = await res.json();

            if (data.success) {
                await fetchProducts();
                setIsModalOpen(false);
                setEditingProduct(null);
            } else {
                alert('Failed to save product');
            }
        } catch (err) {
            alert('Network error');
        } finally {
            setSaving(false);
        }
    };

    // Handle delete
    const handleDelete = async (product: Product) => {
        if (!confirm(`Hapus produk "${product.name}"?`)) return;

        try {
            const res = await fetch(`/api/admin/products/${product.id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchProducts();
            } else {
                alert('Failed to delete product');
            }
        } catch (err) {
            alert('Network error');
        }
    };

    // Handle edit
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    // Handle add new
    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    return (
        <AdminLayout>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Katalog Produk
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Kelola produk yang ditampilkan di katalog
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
                        Tambah Produk
                    </button>
                </div>

                {/* Error State */}
                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Products Table */}
                <ProductsTable
                    products={products}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Product Form Modal */}
            <ProductFormModal
                isOpen={isModalOpen}
                product={editingProduct}
                saving={saving}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                }}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    );
}

export default AdminProductsPage;
