<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    public function run(): void
    {
        ProductImage::truncate();

        Product::all()->each(function ($product) {
            for ($i = 0; $i < 3; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => 'https://picsum.photos/640/480?random=' . rand(1, 10000),
                ]);
            }
        });
    }
}
