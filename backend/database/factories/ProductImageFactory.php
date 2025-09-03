<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        // امسح الصور القديمة
        ProductImage::truncate();

        // ضيف لكل منتج 3 صور جديدة
        Product::all()->each(function ($product) {
            for ($i = 0; $i < 3; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'https://source.unsplash.com/random/640x480?electronics&sig=' . rand(1, 10000),
                ]);
            }
        });
    }
}
