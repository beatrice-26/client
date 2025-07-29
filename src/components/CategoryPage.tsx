import { useState } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import collectionImage from '@/assets/collection-showcase.jpg';

const CategoryPage = ({ category }: { category: string }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Mock product data - in a real app, this would come from an API
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `${category} Item ${i + 1}`,
    brand: 'UrbanThreadz',
    price: Math.floor(Math.random() * 200) + 50,
    originalPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 200 : null,
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 200) + 10,
    image: collectionImage,
    colors: ['Black', 'White', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: Math.random() > 0.7,
    inStock: Math.random() > 0.1,
  }));

  const filters = [
    {
      name: 'Category',
      options: ['Tops', 'Bottoms', 'Outerwear', 'Accessories'],
    },
    {
      name: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      name: 'Color',
      options: ['Black', 'White', 'Grey', 'Navy', 'Beige'],
    },
    {
      name: 'Brand',
      options: ['UrbanThreadz', 'Street Elite', 'Minimal Co.'],
    },
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        {/* Page Header */}
        <div className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
              {category}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of {category.toLowerCase()} fashion pieces
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground">
                {products.length} items
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Select defaultValue="featured">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="w-64 space-y-6">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </h3>

                  {/* Price Range */}
                  <div className="space-y-4 mb-6">
                    <h4 className="font-medium text-sm">Price Range</h4>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Filter Categories */}
                  {filters.map((filter) => (
                    <div key={filter.name} className="space-y-3 mb-6">
                      <h4 className="font-medium text-sm">{filter.name}</h4>
                      <div className="space-y-2">
                        {filter.options.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox id={`${filter.name}-${option}`} />
                            <label
                              htmlFor={`${filter.name}-${option}`}
                              className="text-sm cursor-pointer"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full">
                    Clear All Filters
                  </Button>
                </div>
              </aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;