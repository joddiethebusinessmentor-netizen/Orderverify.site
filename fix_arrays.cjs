const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');

// The sed command `sed -i 's/] = \[//g'` basically replaced `] = [` with ` ` (empty string).
// Which means `const result: CommentItem[] = [` became `const result: CommentItem[ ` which caused expected ] error. Wait, looking at the error:
// `const result: CommentItem[];` -> the error says "The constant "result" must be initialized".
// Wait, no. The error shows:
// const result: CommentItem[];
// So `] = [` was replaced by `];`?
// No, the original must have been `const result: CommentItem[] = [];` and `] = [` was replaced by ``, leaving `const result: CommentItem[];`
// Let's replace:
content = content.replace(/const result: CommentItem\[\];/, "const result: CommentItem[] = [];");
content = content.replace(/const payouts: LivePayout\[\];/, "const payouts: LivePayout[] = [];");
content = content.replace(/const errors: string\[\];/, "const errors: string[] = [];");
content = content.replace(/const page1Items: ProductTemplate\[\];/, "const page1Items: ProductTemplate[] = [];");
content = content.replace(/const page2Items: ProductTemplate\[\];/, "const page2Items: ProductTemplate[] = [];");
content = content.replace(/const page3Items: ProductTemplate\[\];/, "const page3Items: ProductTemplate[] = [];");
content = content.replace(/const orders: Order\[\];/, "const orders: Order[] = [];");
content = content.replace(/const targetCountryList: string\[\n/, "const targetCountryList: string[] = [\n");

// Any others? Let's check for any `string[` or `number[` or `Item[`
// But I can also just regex replace `\[\];` where it shouldn't be? No, `[]` is fine. The issue was `] = [` got removed.
// Original: `const page1Items: ProductTemplate[] = [];`
// Remove `] = [` gives `const page1Items: ProductTemplate[];` - yes!

// Original: `const targetCountryList: string[] = [`
// Remove `] = [` gives `const targetCountryList: string[`

fs.writeFileSync('src/data.ts', content);
