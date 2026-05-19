import 'dotenv/config'
import { db } from './index'
import { productCategories, products, expenseCategories, users, accounts } from './schema'

async function seed() {
    console.log('🌱 Seeding database...')

    try {
        // Seed product categories
        console.log('📦 Seeding product categories...')
        await db.insert(productCategories).values([
            { name: 'Pikset', slug: 'pikset', sortOrder: 1 },
            { name: 'Sempring', slug: 'sempring', sortOrder: 2 },
            { name: 'Basreng', slug: 'basreng', sortOrder: 3 },
            { name: 'Paket', slug: 'paket', sortOrder: 4 },
        ]).onConflictDoNothing()

        // Seed dummy product for testing
        console.log('🛒 Seeding dummy product...')
        await db.insert(products).values({
            name: 'Keripik Pikset Setan',
            slug: 'keripik-pikset-setan',
            description: 'Keripik singkong super pedas dengan bumbu rahasia. Sensasi pedas yang bikin ketagihan!',
            price: 15000,
            originalPrice: 18000,
            spicyLevel: 5,
            images: [
                'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rcVFAw8wqfkkTPc6dp-uTxv0bzziDvyZOnEPj_henIwxmymrN8xenu-WZ7XfRp08QRp11RLdr_RdKdroVlLTXUuA9mxyqjuzYfKDpwFhXp5xe83PSQozuIzzbzeb3mztSyPWdkcXETmofCoMWqNaxlP49fh3pEa3nnOXtOmjyOrM11nGkfDWymDDXu6343kz62wdw3EpZat-xzRuNGQsLURm6KAAhekO5j86GUohkNOM1leDm9P3XUbP5Z_Ehzb7SBAXqtOp7Wpz',
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDKb8wJD-B_wFtYoXxw25Qu13TAQXFllFA37fu1ywScSQ4i8lmlFDrDbrbqTzOk3259wrH13PwFnSWHQWSCHwRdnmwlTxllkIKb9rpUncJx2VrRUmPD-B4L-xW4T_WgF10yyPRSB4TvGaBUrrijWOmg5nFq9DVVxwiguzyyY71SFOWBKmBMM02qLdoOukmXd41lQmVbh7As4Ucs-cxmrHXK38WsBzCM2pa9M7mbECfNLZT_L0wclOjjucVumnHGMqwVfx-ju1qMahcP'
            ],
            isActive: true,
            stock: 100,
            sortOrder: 1,
        }).onConflictDoNothing()

        // Seed expense categories
        console.log('💰 Seeding expense categories...')
        await db.insert(expenseCategories).values([
            { name: 'Bahan Baku', color: '#ef4444' },
            { name: 'Packaging', color: '#f97316' },
            { name: 'Operasional', color: '#eab308' },
            { name: 'Marketing', color: '#22c55e' },
            { name: 'Pengiriman', color: '#3b82f6' },
            { name: 'Lainnya', color: '#8b5cf6' },
        ]).onConflictDoNothing()

        // Seed admin user
        console.log('👤 Seeding admin user...')
        const [existingUser] = await db.select().from(users).limit(1)

        if (!existingUser) {
            const [user] = await db.insert(users).values({
                email: 'admin@satri.com',
                name: 'Admin Satri',
                emailVerified: true,
            }).returning()

            // Create account with password (Better Auth will hash it)
            await db.insert(accounts).values({
                userId: user.id,
                accountId: user.id,
                providerId: 'credential',
                // Note: Password should be hashed using Better Auth's hash function
                // For initial setup, use Better Auth's sign-up endpoint
                password: 'admin123', // This is temporary, change via proper signup
            })

            console.log('✅ Admin user created: admin@satri.com')
        } else {
            console.log('ℹ️ Admin user already exists')
        }

        console.log('✅ Seed completed!')
    } catch (error) {
        console.error('❌ Seed failed:', error)
        process.exit(1)
    }

    process.exit(0)
}

seed()
