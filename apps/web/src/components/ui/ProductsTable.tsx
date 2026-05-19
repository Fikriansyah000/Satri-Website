interface Product {
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

interface ProductsTableProps {
    products: Product[];
    loading: boolean;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}



export function ProductsTable({ products, loading, onEdit, onDelete }: ProductsTableProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="flex items-center justify-center gap-3 text-slate-500">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Loading...
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600 mb-4">
                    inventory_2
                </span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Belum ada produk
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                    Klik tombol "Tambah Produk" untuk menambahkan produk pertama.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-card-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Produk
                            </th>
                            <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Harga
                            </th>
                            <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Stok
                            </th>
                            <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Level Pedas
                            </th>
                            <th className="text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Status
                            </th>
                            <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-6 py-4">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                {/* Product Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                                            {product.images && product.images[0] ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <div className="size-full flex items-center justify-center text-slate-400">
                                                    <span className="material-symbols-outlined">image</span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {product.name}
                                            </h3>
                                            {product.description && (
                                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xs">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-900 dark:text-white">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <span className="text-xs text-slate-400 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                </td>

                                {/* Stock */}
                                <td className="px-6 py-4 text-center">
                                    <span className={`font-medium ${(product.stock ?? 0) > 10
                                        ? 'text-green-600 dark:text-green-400'
                                        : (product.stock ?? 0) > 0
                                            ? 'text-orange-600 dark:text-orange-400'
                                            : 'text-red-600 dark:text-red-400'
                                        }`}>
                                        {product.stock ?? 0}
                                    </span>
                                </td>

                                {/* Spicy Level */}
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <span
                                                key={level}
                                                className={`text-sm ${level <= (product.spicyLevel ?? 0)
                                                    ? 'text-red-500'
                                                    : 'text-slate-300 dark:text-slate-600'
                                                    }`}
                                            >
                                                🌶️
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${product.isActive
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                                        }`}>
                                        {product.isActive ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(product)}
                                            className="p-2 text-slate-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>edit</span>
                                        </button>
                                        <button
                                            onClick={() => onDelete(product)}
                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
