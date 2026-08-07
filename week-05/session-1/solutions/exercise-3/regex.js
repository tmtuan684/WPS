
// 1
"Room 204 has 12 chairs and 350 students.".match(/\b\d{3}\b/g);
// → ["204", "350"]

// 2
/^\d+$/.test("12345");   // true
/^\d+$/.test("123-45");  // false
/^\d+$/.test("12 345");  // false

// 3
"I run every day. Running keeps me fit. He is a runner."
  .match(/\brun\b/gi);
// → ["run"]  (add the i flag if "Running" should count as case-insensitive whole word... it still won't, because "Running" ≠ "run")

// 4
const re5 = /^0\d{9}$/;
re5.test("0912345678");   // true
re5.test("912345678");    // false, no leading 0
re5.test("09123456789");  // false, too many digits
re5.test("0912-345-678"); // false, dashes not allowed

// 5
const re6 = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/;
re6.test("#1b2430"); // true
re6.test("#fff");    // true
re6.test("#12g456"); // false, 'g' isn't a hex digit
re6.test("1b2430");  // false, missing #

// 6
const m7 = "Assignment due 2026-08-15".match(/(\d{4})-(\d{2})-(\d{2})/);
// m7[1] = "2026", m7[2] = "08", m7[3] = "15"

// 7
const re8 = /\.(jpg|jpeg|png|gif)$/i; // the i flag makes "image.JPEG" match too
re8.test("photo.png");    // true
re8.test("notes.txt");    // false
re8.test("image.JPEG");   // true only with the i flag

// 8
const re1 = /^\w+@\w+\.\w+$/;
re1.test("tuan@rmit.com");       // true
re1.test("tuan.nguyen@rmit.com");// false — dot in username not allowed yet
re1.test("tuan@rmit.edu.vn");    // false — two dots in domain not allowed yet

// 9
const re3 = /^[\w.]+@[\w-]+(\.[\w-]+)+$/;
re3.test("s1234567@rmit.edu.vn"); // true
re3.test("info@company.co.uk");   // true
re3.test("user@mail.com");        // true

// 10
const re7 = /^s\d{7}@rmit\.edu\.vn$/;
re7.test("s1234567@rmit.edu.vn"); // true
re7.test("S1234567@rmit.edu.vn"); // false — capital S
re7.test("s123456@rmit.edu.vn");  // false — only 6 digits
re7.test("s1234567@gmail.com");   // false — wrong domain