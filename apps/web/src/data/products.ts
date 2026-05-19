export interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  rating?: number
  spicyLevel?: number | 'All Levels'
  images: string[]
  category: 'Pikset' | 'Sempring' | 'Basreng' | 'Paket'
  badge?: {
    text: string
    color: 'primary' | 'accent' | 'default'
  }
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Keripik Pikset Setan',
    description: 'Keripik singkong super pedas dengan bumbu rahasia.',
    price: 15000,
    spicyLevel: 5,
    category: 'Pikset',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rcVFAw8wqfkkTPc6dp-uTxv0bzziDvyZOnEPj_henIwxmymrN8xenu-WZ7XfRp08QRp11RLdr_RdKdroVlLTXUuA9mxyqjuzYfKDpwFhXp5xe83PSQozuIzzbzeb3mztSyPWdkcXETmofCoMWqNaxlP49fh3pEa3nnOXtOmjyOrM11nGkfDWymDDXu6343kz62wdw3EpZat-xzRuNGQsLURm6KAAhekO5j86GUohkNOM1leDm9P3XUbP5Z_Ehzb7SBAXqtOp7Wpz', // Main (using same as homepage for now, or match catalog first image if different)
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKb8wJD-B_wFtYoXxw25Qu13TAQXFllFA37fu1ywScSQ4i8lmlFDrDbrbqTzOk3259wrH13PwFnSWHQWSCHwRdnmwlTxllkIKb9rpUncJx2VrRUmPD-B4L-xW4T_WgF10yyPRSB4TvGaBUrrijWOmg5nFq9DVVxwiguzyyY71SFOWBKmBMM02qLdoOukmXd41lQmVbh7As4Ucs-cxmrHXK38WsBzCM2pa9M7mbECfNLZT_L0wclOjjucVumnHGMqwVfx-ju1qMahcP'  // Hover
    ],
    badge: { text: 'Pikset', color: 'default' } // Using category as badge in catalog card
  },
  {
    id: '2',
    name: 'Sempring Original',
    description: 'Renyah, gurih, dan sedikit pedas untuk teman ngopi.',
    price: 12000,
    spicyLevel: 2,
    category: 'Sempring',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5ZQ8MuKSxNuWUwiAsNiFvWPTG3Anv3zKpr6ZO7JlP7f172urp9FB2Dl4EymRRRknYkPMy3QxEKcZpCvGGmdAIiQR494Pd7BI3qpNpJFVTycLdolQTuy0e30WjhhN2_V6ag9M9ylBUlQquk2kTbC64DZJx_5sXMZfS0Fd_-2sZMe02rbGM0Fc3BFJJaUX3J9nPcORQWt9e1B5ogYdrFOci4aNEjcmjpWb9fK6dEKSR-18M5CIOtC0wWGloPTFWAdO9tbODM4DHDPp0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASZzbrI_LUTFdhnSWl31hvbgcouQJavB2hnK6vbBxUjVETZ5uaEbJR04tSMKlLLNFd3sS4GokcUI7oCXT_R_ZoaX1e_0BbVVxHTIt2Omot-uW-4CuI1iFKghhPls4Mno0HqegDHNOaDo781BXKA4Mj2QvZ51v8pzFtjELY2LD3CuIqo66bG7BXw2nWnVExy9KU0pAaVLqVDmY-Win1MkCyGAdT7IvQn937DjVIT-rLws7MJA5SDfjc_1Pwrr4722SMlFT1zp6kpQup'
    ],
    badge: { text: 'Sempring', color: 'default' }
  },
  {
    id: '3',
    name: 'Basreng Jeruk Nipis',
    description: 'Basreng pedas dengan aroma daun jeruk yang segar.',
    price: 18000,
    spicyLevel: 4,
    category: 'Basreng',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD2SEPG0_7LhWyeWzYZmhG03IQofatM2RQrzgC_h3xI_JsNE4fOhdbnUasTe0bH-Em25I05_CKDBDsGbBmmqT1-G_AlGfsbaFAb1qXvvoqk82flU0J2CiwxuuGngDyGrj5su49QJWYYx8XRyfHZxhwsNeajcSSZc1b9unJbeTReWIeshefL33bcpN4JQng4UQHQ5vKX3_OHhscHlWqML3q3u5CaRUXFt6q-qALMqL25I4a3HgWUHzw1RA6XdOGeGMbBynpqqvmMiIcN',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEo7bBbqPaIBgqmbb3c0G7_QwHi6yWnUVJwjMVlN2KqA22WvXg9058zJogfwr2dS44954esD2O4vkoknxHLJKEJ7EtHFH6hFuKfRlgjAQL2r1umQ-wxqONVixv8m5K6xL80mTrEejjdLh95DuUeDDmPbVdUEr6aKfftzp9P4blMNaTDbx5h1azKG6hXpX0Ps8L1AP2ZqwCPbX9cx-YcscvpCWTvpCPNiMHEgOm6SjFNoaXbb5qiuIxtpbYtexQx-vIKh3pUB_AIXiw'
    ],
    badge: { text: 'Basreng', color: 'default' }
  },
  {
    id: '4',
    name: 'Pikset Cabe Ijo',
    description: 'Sensasi pedas cabe ijo yang unik dan bikin nagih.',
    price: 16500,
    spicyLevel: 3,
    category: 'Pikset',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2GG7R_dfN-KjOh0w_Pzqb7z93YwzaHzTZVGT8HYPus4m02ehKIqUHLb-7YwCd2nIY2P1tMOi6PxDh3-8TW2RWvdD0HJAf632QxfT_2Oa8qXMTR23b1jLhqz0D0CemE9YuTCgOpTuU7CnJaoPEaIQlD7-OjPuUHdJn3hZQEqjwWjLzQgFhkcmBMJU3jC4A19tLN9jwP9_rQsBvOClWXvoL_WxOaSgea7G4Cpjn4NDr9Iw0aN1mx4dtvK1ypIk6wdQ-YyBrGcBp3OQj',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfPhPNGaBmv-An5Hzxnla69qHv5fe4aP2_3PzFuGjb_2XYU-NLnHc3ZnMrVzSnpZ72g40B_Up_nXtna8YNL8F8lhNdbssMOeSD6MWX5OnfQab0jBxFUpE9B1fSJN3zo38gZBLmY8Q2FrKcAkbEOVtCLnEScyr-RMiI2cnpGhhXVPzj2s618yS_41BMQwudxz0kyqEb1yUcSKT7p5VUCtcPRbDwwvKuOkycHdLFeDUSZE4KK2toPUZ157QQjYv9U2azgbg_hmQjIDYD'
    ],
    badge: { text: 'Pikset', color: 'default' }
  },
  {
    id: '5',
    name: 'Sempring Balado',
    description: 'Bumbu balado basah yang melimpah ruah.',
    price: 13000,
    spicyLevel: 5,
    category: 'Sempring',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmjSR6zTUPOHnpfz9JFiJdv78QREQO1SEFSYw4XBZw3ELcr_qrxq5naiaKJ4_PeYsu5_3fZI50QqnMMleHlMALDOv2zWQ-6YbPJ2BsnqsrrYmNQlaOqKpkRePuh9QapciCrO78l8BotAJvIEfib3TUqf3oynmOAkFiJYDac114JgaSywLMdZESCj16SU2MzRQPUZe5GWGyfGl8RWDLfNVp70Dpr9CmCulJLARISshr4_otIEgnCIkN6iMGOfh7IuZb3cych0KEQ6tY',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1UzKiYDtcxeJ4p0enL8E8mfV2wQxvamYMEA012tRyt2c0SVrIzC2e5Uf-ANgIzyTgZGb8uiJOZAr4f501sjzZNVNczLO6Z9ha8dROlNsL7lP_6sG6QStSX5MBNV00R2Kr7DQyLdS2lq5CPn6pGz5NFxVaTJsAwkvMR7_-wrVeg0bNxuhHXTuUe3EPsSI1UsPRDUV628H6R3vnMUTIO5L1MgHgkd4EBiO-pJEPmNbccM9cuVFmhd8_lrzeUQ_sxQidvnncdttBj_Lc'
    ],
    badge: { text: 'Sempring', color: 'default' }
  },
  {
    id: '6',
    name: 'Paket Hemat Satri',
    description: 'Cobain semua varian dalam satu paket hemat. Isi 4 bungkus.',
    price: 55000,
    spicyLevel: 'All Levels',
    category: 'Paket',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1G2Tq-ALu3IacyVLHh8xQlK0R4Dp2QicRLhfgMhXj64L2e2zyS7mjh_itVqCwCK-IlwFgfAQlquox8ZvesL_loI3WqTGXYXMMyQVHxx6mkstBBsrhS6Eu3dD4Zrq9AoJPcLanSgXnJ4l6TJtX3mMaaFI8sc7XoVA4LYD2x0EA-keH6ktwDP7lEpuQlMX-9gw4SsWt8-0IbWK6hGsrz3Cxuj_rncQS-wrz2TEU5HvyPKMkNrXQDwg3QJLBWwi78KHARzZkauJ0Epk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJmRgxd1BW5YsiBlHaV3A5XJImoz-fWc5X5wynjdAETzRSNoHKib4T_re9955zdHWOYNX3FX81hPtE-PoSMUQ4_fwQmys69c0IYQocIQhnyugRaA0SWz6mV8DyxVmnHjL0EQSOxYAUVU9jGUHwI8lCvTUvGrZdwhm9UwDsyY-KxmpoJ4Rs_I_iGK2GPYViTukHZmgWkpEpfm_M-q-Cq7R7cUkmhDzf3Tk2ITu5TFLxNAbWJ9Zb_tkPojvypIeXtSHRPrKIkxojuqOm'
    ],
    badge: { text: 'Paket', color: 'default' }
  }
]
