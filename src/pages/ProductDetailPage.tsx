import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Share2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import Footer from '@/components/Footer';
import ProductShowcase from '@/components/ProductShowcase';
import collectionImage from '@/assets/collection-showcase.jpg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: Number(id),
    name: 'Minimalist Blazer',
    brand: 'UrbanThreadz',
    price: 189,
    originalPrice: 229,
    rating: 4.8,
    reviews: 124,
    description: 'A contemporary take on the classic blazer, crafted from premium sustainable materials. This piece combines modern minimalism with exceptional comfort, perfect for both professional and casual settings.',
    images: [collectionImage, collectionImage, collectionImage, collectionImage],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'Navy', value: '#1e3a8a' },
      { name: 'Grey', value: '#6b7280' },
      { name: 'Camel', value: '#d97706' },
    ],
    sizes: [
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: true },
      { name: 'L', inStock: false },
      { name: 'XL', inStock: true },
    ],
    features: [
      'Premium sustainable materials',
      'Tailored fit with stretch comfort',
      'Wrinkle-resistant fabric',
      'Dry clean or machine washable',
    ],
    inStock: true,
    deliveryInfo: 'Free delivery on orders over $100',
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    // TODO: Implement add to cart functionality with Supabase
    console.log('Added to cart:', { product: product.name, size: selectedSize, color: selectedColor, quantity });
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // TODO: Implement wishlist functionality with Supabase
    console.log('Toggled wishlist:', product.name);
  };

  return (
    <div className="min-h-screen">
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.brand}
                </Badge>
                <h1 className="text-3xl font-light tracking-wide mb-2">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-3xl font-light">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                      <Badge variant="destructive">
                        Save ${product.originalPrice - product.price}
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <h3 className="font-medium">Color: {selectedColor}</h3>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-primary scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="font-medium">Size</h3>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size.name}
                      variant={selectedSize === size.name ? 'default' : 'outline'}
                      className="aspect-square"
                      onClick={() => setSelectedSize(size.name)}
                      disabled={!size.inStock}
                    >
                      {size.name}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Need help with sizing? <a href="#" className="underline">Size Guide</a>
                </p>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="font-medium">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  className="w-full h-12 text-lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${product.price * quantity}
                </Button>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center space-x-3 text-sm">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span>{product.deliveryInfo}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details & Care</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <h4 className="font-medium mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium mb-3">Materials</h4>
                    <p className="text-muted-foreground mb-4">
                      65% Recycled Polyester, 30% Organic Cotton, 5% Elastane
                    </p>
                    
                    <h4 className="font-medium mb-3">Fit</h4>
                    <p className="text-muted-foreground">
                      Tailored fit with slight stretch for comfort. Model is 5'9" wearing size S.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Care Instructions</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Machine wash cold with like colors</li>
                      <li>• Do not bleach</li>
                      <li>• Tumble dry low</li>
                      <li>• Iron on low heat if needed</li>
                      <li>• Dry clean if preferred</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Customer Reviews</h4>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  {/* Reviews would go here */}
                  <p className="text-muted-foreground">
                    Reviews feature coming soon. Connect to Supabase to enable user reviews.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related Products */}
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;