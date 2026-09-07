const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// First replacement (small top image)
code = code.replace(
  '<img \n                    src={activeVerification.avatar} \n                    alt={activeVerification.name}\n                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-[#00E676] object-cover" \n                    referrerPolicy="no-referrer"\n                    onError={(e) => {\n                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVerification.name)}&background=141624&color=00E676&bold=true`;\n                    }}\n                  />',
  '<img \n                    src={activeVerification.productImage} \n                    alt={activeVerification.product}\n                    className="w-20 h-20 rounded-2xl mx-auto mb-3 border-2 border-[#00E676] object-cover shadow-lg" \n                    referrerPolicy="no-referrer"\n                    onError={(e) => {\n                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";\n                      e.currentTarget.onerror = null;\n                    }}\n                  />'
);

// Second replacement (large animated image)
code = code.replace(
  '<img \n                        src={activeVerification.avatar} \n                        alt={activeVerification.name}\n                        className="w-full h-full rounded-full border-4 border-[#00E676] object-cover relative z-10" \n                        referrerPolicy="no-referrer"\n                        onError={(e) => {\n                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeVerification.name)}&background=141624&color=00E676&bold=true`;\n                        }}\n                      />',
  '<img \n                        src={activeVerification.productImage} \n                        alt={activeVerification.product}\n                        className="w-full h-full rounded-3xl border-4 border-[#00E676] object-cover relative z-10 bg-slate-800" \n                        referrerPolicy="no-referrer"\n                        onError={(e) => {\n                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";\n                          e.currentTarget.onerror = null;\n                        }}\n                      />'
);

// Ensure the outer ring of the second replacement is a rounded-3xl instead of rounded-full since we changed the image shape
code = code.replace(
  '<div className="absolute inset-0 rounded-full border-4 border-[#00E676] animate-ping opacity-75"></div>\n                      <div className="absolute inset-[-10px] rounded-full border-2 border-[#00E676]/30 animate-ping opacity-50" style={{ animationDelay: \'200ms\' }}></div>',
  '<div className="absolute inset-0 rounded-3xl border-4 border-[#00E676] animate-ping opacity-75"></div>\n                      <div className="absolute inset-[-10px] rounded-3xl border-2 border-[#00E676]/30 animate-ping opacity-50" style={{ animationDelay: \'200ms\' }}></div>'
);

fs.writeFileSync('src/App.tsx', code);
console.log('Replaced avatar with product image in the modal.');

