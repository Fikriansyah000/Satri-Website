import { useState, useEffect, useRef } from 'react';

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price: number;
    originalPrice?: number | null;
    spicyLevel?: number | null;
    images?: string[] | null;
    isActive?: boolean | null;
    stock?: number | null;
    categoryId?: string | null;
    sortOrder?: number | null;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    spicyLevel: number;
    images: string[];
    isActive: boolean;
    stock: number;
    categoryId?: string;
}

interface ProductFormModalProps {
    isOpen: boolean;
    product: Product | null;
    saving: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => void;
}

const CATEGORIES = [
    { id: 'pikset', name: 'Pikset' },
    { id: 'sempring', name: 'Sempring' },
    { id: 'basreng', name: 'Basreng' },
    { id: 'paket', name: 'Paket' },
];

export function ProductFormModal({ isOpen, product, saving, onClose, onSubmit }: ProductFormModalProps) {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        originalPrice: undefined,
        spicyLevel: 0,
        images: [],
        isActive: true,
        stock: 0,
        categoryId: undefined,
    });

    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Populate form when editing
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price,
                originalPrice: product.originalPrice ?? undefined,
                spicyLevel: product.spicyLevel ?? 0,
                images: product.images || [],
                isActive: product.isActive ?? true,
                stock: product.stock ?? 0,
                categoryId: product.categoryId ?? undefined,
            });
        } else {
            // Reset form for new product
            setFormData({
                name: '',
                description: '',
                price: 0,
                originalPrice: undefined,
                spicyLevel: 0,
                images: [],
                isActive: true,
                stock: 0,
                categoryId: undefined,
            });
        }
    }, [product, isOpen]);

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formDataUpload = new FormData();
                formDataUpload.append('image', file);

                const res = await fetch('/api/admin/upload', {
                    method: 'POST',
                    body: formDataUpload,
                });

                const data = await res.json();
                if (data.success) {
                    return data.data.url;
                }
                throw new Error('Upload failed');
            });

            const urls = await Promise.all(uploadPromises);
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, ...urls].slice(0, 5), // Max 5 images
            }));
        } catch (err) {
            alert('Gagal upload gambar');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Remove image
    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || formData.price <= 0) {
            alert('Nama dan harga wajib diisi');
            return;
        }
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-card-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden m-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {product ? 'Edit Produk' : 'Tambah Produk Baru'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="p-6 space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Nama Produk <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                placeholder="Contoh: Keripik Pikset Setan"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                                placeholder="Deskripsi produk..."
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Kategori
                            </label>
                            <select
                                value={formData.categoryId || ''}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value || undefined })}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                            >
                                <option value="">Pilih Kategori</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price & Original Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Harga Jual <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
                                    <input
                                        type="number"
                                        value={formData.price || ''}
                                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Harga Coret (Opsional)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
                                    <input
                                        type="number"
                                        value={formData.originalPrice || ''}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Stock & Spicy Level */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Level Pedas: {formData.spicyLevel}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        value={formData.spicyLevel}
                                        onChange={(e) => setFormData({ ...formData, spicyLevel: Number(e.target.value) })}
                                        className="flex-1 accent-red-500"
                                    />
                                    <span className="text-lg">
                                        {formData.spicyLevel > 0 ? '🌶️'.repeat(formData.spicyLevel) : '⚪'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Gambar Produk
                            </label>

                            {/* Image Preview Grid */}
                            <div className="grid grid-cols-5 gap-3 mb-3">
                                {formData.images.map((url, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 group">
                                        <img src={url} alt={`Product ${idx + 1}`} className="size-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-white">delete</span>
                                        </button>
                                    </div>
                                ))}

                                {/* Upload Button */}
                                {formData.images.length < 5 && (
                                    <label className="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                                        {uploading ? (
                                            <span className="material-symbols-outlined animate-spin text-slate-400">progress_activity</span>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-slate-400">add_photo_alternate</span>
                                                <span className="text-xs text-slate-500 mt-1">Upload</span>
                                            </>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-xs text-slate-500">Maksimal 5 gambar, ukuran max 5MB per gambar</p>
                        </div>

                        {/* Is Active Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Status Produk</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Produk aktif akan ditampilkan di katalog
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                className={`relative w-12 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            disabled={saving}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving && <span className="material-symbols-outlined animate-spin" style={{ fontSize: 18 }}>progress_activity</span>}
                            {product ? 'Simpan Perubahan' : 'Tambah Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
