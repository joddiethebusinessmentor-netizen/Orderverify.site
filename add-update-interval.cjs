const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

if (!app.includes('update2HourDataIfChanged')) {
  // Add the import
  app = app.replace(
    "import { orderData, livePayouts, initialComments, generate2HourComments, formatLocalCurrency } from './data';",
    "import { orderData, livePayouts, initialComments, generate2HourComments, formatLocalCurrency, update2HourDataIfChanged } from './data';"
  );
  app = app.replace(
    "import { orderData, livePayouts, initialComments, generate12HourComments, formatLocalCurrency } from './data';",
    "import { orderData, livePayouts, initialComments, generate12HourComments, formatLocalCurrency, update2HourDataIfChanged } from './data';"
  );
  
  // Also replace generate12HourComments with generate2HourComments if it exists
  app = app.replace(/12Hour/g, '2Hour');

  // Find a good place to add the interval, e.g., next to the clock timer
  const clockTimer = 'const timer = setInterval(() => setTime(new Date()), 1000);';
  const newTimer = `const timer = setInterval(() => { setTime(new Date()); update2HourDataIfChanged(); }, 1000);`;
  app = app.replace(clockTimer, newTimer);
  
  fs.writeFileSync('src/App.tsx', app);
  console.log('Added 2-hour data refresh interval to App.tsx');
} else {
  console.log('Already added');
}
