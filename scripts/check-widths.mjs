import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:3000/quiz', { waitUntil: 'networkidle' });
  
  // Wait for the quiz to load
  await page.waitForSelector('button', { timeout: 5000 });

  // Take a screenshot of the full quiz page
  await page.screenshot({ path: 'scripts/quiz-q1-full.png', fullPage: true });

  // Measure each answer option button's bounding box
  const buttons = await page.$$eval(
    'button.rounded-2xl.border-2',
    (els) =>
      els.map((el, i) => {
        const rect = el.getBoundingClientRect();
        return {
          index: i,
          text: el.textContent?.trim().substring(0, 50),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          top: Math.round(rect.top),
        };
      })
  );

  console.log('\n=== Answer Option Button Dimensions ===');
  console.log(JSON.stringify(buttons, null, 2));

  // Check if widths are equal
  const widths = buttons.map(b => b.width);
  const allEqual = widths.every(w => w === widths[0]);
  console.log(`\nAll widths equal: ${allEqual}`);
  console.log(`Widths: ${widths.join(', ')}`);
  console.log(`Min: ${Math.min(...widths)}, Max: ${Math.max(...widths)}`);

  // Also check the wrapper divs around buttons
  const wrappers = await page.$$eval(
    '.grid.grid-cols-1 > div',
    (els) =>
      els.map((el, i) => {
        const rect = el.getBoundingClientRect();
        return {
          index: i,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        };
      })
  );

  console.log('\n=== Grid Cell Wrapper Dimensions ===');
  console.log(JSON.stringify(wrappers, null, 2));

  // Check the grid container itself  
  const grid = await page.$eval(
    '.grid.grid-cols-1',
    (el) => {
      const rect = el.getBoundingClientRect();
      const styles = window.getComputedStyle(el);
      return {
        width: Math.round(rect.width),
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    }
  );

  console.log('\n=== Grid Container ===');
  console.log(JSON.stringify(grid, null, 2));

  await browser.close();
})();
