import { useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  image: string;
  colors: string[];
  sizes: string[];
  isNew: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement add to cart functionality with Supabase
    console.log('Added to cart:', product.name);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInWishlist(!isInWishlist);
    // TODO: Implement wishlist functionality with Supabase
    console.log('Toggled wishlist:', product.name);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'Black': 'bg-black',
      'White': 'bg-white border-2 border-gray-200',
      'Grey': 'bg-gray-400',
      'Navy': 'bg-blue-900',
      'Sage': 'bg-green-400',
      'Charcoal': 'bg-gray-700',
      'Olive': 'bg-green-700',
      'Camel': 'bg-yellow-600',
      'Beige': 'bg-amber-100',
      'Cream': 'bg-yellow-50',
    };
    return colorMap[color] || 'bg-gray-400';
  };

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`}>
        <div className="flex gap-6 p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="w-48 h-64 relative overflow-hidden rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
              <h3 className="font-medium text-lg tracking-wide">
                {product.name}
              </h3>
            </div>

            <div className="flex items-center space-x-1">
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
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {product.colors.slice(0, 5).map((color) => (
                <div
                  key={color}
                  className={`w-4 h-4 rounded-full ${getColorClass(color)}`}
                  title={color}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-xl">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleWishlist}
                  className={isInWishlist ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="product-card group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image-container aspect-[3/4] mb-4 relative">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="ghost"
            className={`absolute top-3 right-3 bg-background/80 hover:bg-background transition-all ${
              isInWishlist ? 'text-red-500' : ''
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-background hover:bg-accent hover:text-accent-foreground"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="bg-background hover:bg-accent hover:text-accent-foreground"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="font-medium text-sm tracking-wide">
              {product.name}
            </h3>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          {/* Colors */}
          <div className="flex items-center space-x-1">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className={`w-3 h-3 rounded-full border border-border ${getColorClass(color)}`}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-medium text-lg">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;