import React from "react";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="hero">

        <h1>Discover Your Signature Scent</h1>

        <p>Premium fragrances for modern lifestyle</p>

        <button className="btn-primary">
          Shop Now
        </button>

      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">

        <h2>Featured Products</h2>

        <div className="product-grid">

          {/* Product 1 */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1615634260167-c8cdede054de"
              alt="Perfume"
            />
            <h3>Rose Bloom</h3>
            <p>₹999</p>
            <button>Add to Cart</button>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539"
              alt="Perfume"
            />
            <h3>Oud Royal</h3>
            <p>₹1499</p>
            <button>Add to Cart</button>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f"
              alt="Perfume"
            />
            <h3>Citrus Fresh</h3>
            <p>₹799</p>
            <button>Add to Cart</button>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f"
              alt="Perfume"
            />
            <h3>Luxury Musk</h3>
            <p>₹1999</p>
            <button>Add to Cart</button>
          </div>

        </div>

      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories">

        <h2>Shop by Category</h2>

        <div className="category-grid">

          <div className="category-card men">
            <h3>Men</h3>
          </div>

          <div className="category-card women">
            <h3>Women</h3>
          </div>

          <div className="category-card luxury">
            <h3>Luxury</h3>
          </div>

          <div className="category-card new">
            <h3>New Arrivals</h3>
          </div>

        </div>

      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">

        <h2>Why Choose FragranceCo?</h2>

        <div className="why-grid">

          <div className="why-card">
            <h3>🌸 Long Lasting</h3>
            <p>
              Our perfumes stay fresh for 12+ hours with premium oils.
            </p>
          </div>

          <div className="why-card">
            <h3>💎 Premium Quality</h3>
            <p>
              Crafted with imported ingredients and luxury blends.
            </p>
          </div>

          <div className="why-card">
            <h3>🚚 Free Delivery</h3>
            <p>
              Fast and free shipping across India on all orders.
            </p>
          </div>

          <div className="why-card">
            <h3>⭐ Trusted Brand</h3>
            <p>
              Loved by 50,000+ happy customers nationwide.
            </p>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-container">

          {/* Brand */}
          <div className="footer-box">
            <h3>FragranceCo</h3>
            <p>
              Premium fragrances crafted for elegance and confidence.
            </p>
          </div>

          {/* Links */}
          <div className="footer-box">
            <h4>Quick Links</h4>

            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>My Account</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-box">
            <h4>Support</h4>

            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Return Policy</li>
              <li>Help Center</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-box">
            <h4>Contact Us</h4>

            <p>Email: support@fragranceco.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} FragranceCo. All Rights Reserved.
        </div>

      </footer>



    </div>
  );
}
