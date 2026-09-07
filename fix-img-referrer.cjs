const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add referrerPolicy="no-referrer" to the product image tag
code = code.replace(
  '<img src={order.productImage} alt={order.product} className={`w-full h-full object-cover ${isVerified ? \'grayscale\' : \'\'}`} />',
  '<img src={order.productImage} alt={order.product} referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550520286-663806a6af32?w=500&q=80" }} className={`w-full h-full object-cover ${isVerified ? \'grayscale\' : \'\'}`} />'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Added referrerPolicy and fallback to product images.');
