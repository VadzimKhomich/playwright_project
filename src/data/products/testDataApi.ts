import { ICreateProductData } from "data/types/product.types";
import { generateProductData } from "./generateProductData";
import { MANUFACTURERS } from "./manufactures";

export const validCreateProductData: ICreateProductData[] = [
  {
    title: "Should create product with avarage valid product data",
    product: generateProductData(),
  },
  {
    title: "Should create product with one space in product name",
    product: generateProductData({ name: "test space" }),
  },
  {
    title: "Should create product with product name wich contains only 3 characters",
    product: generateProductData({ name: "nly" }),
  },
  {
    title: "Should create product with product name wich contains 40 characters",
    product: generateProductData({ name: "plhhslpceifqvwcfzkfdibgxrxplfdebmccmljtf" }),
  },
  {
    title: "Should create product with product with price = 1",
    product: generateProductData({ price: 1 }),
  },
  {
    title: "Should create product with product with price = 99999",
    product: generateProductData({ price: 1 }),
  },
  {
    title: "Should create product with product with amount = 0",
    product: generateProductData({ amount: 0 }),
  },

  {
    title: "Should create product with product with amount = 999",
    product: generateProductData({ amount: 999 }),
  },
  {
    title: "Should create product with empty notes field",
    product: generateProductData({ notes: "" }),
  },
  {
    title: "Should create product with note=250 characters",
    product: generateProductData({
      notes:
        "wdudsi%ubihwwnwijkkttubs9skqknrlomaqfkdu!kfrxdhjeerrirzjeuiejzmjbvuxaqsvdwpwqokxbounfrsjbxawozmrpkjrdksonordobpnlzhyotvmcrmtpdhmysguoordqccuplrcromczyfilbzrxmyqrsqmtbpjffgvlabgumzlvutoflphldhvywaldvsktthdcsoivufryzmhnsppwkztipiikirltlnosufoxzvjkimzgo",
    }),
  },
];

export const invalidCreateProductData: ICreateProductData[] = [
  {
    title: "Should NOT create product with emty name",
    product: generateProductData({ name: "" }),
  },
  {
    title: "Should NOT create product with product name=2 characters",
    product: generateProductData({ name: "no" }),
  },
  {
    title: "Should NOT create product with product name=41 characters",
    product: generateProductData({ name: "prqtznelcbccybpeodwrggrbrpvvniwvthvgleauy" }),
  },
  {
    title: "Should NOT create product with product name wich contains 2 spaces",
    product: generateProductData({ name: "test.  test" }),
  },
  {
    title: "Should NOT create product when manufacturer is empty",
    product: generateProductData({ manufacturer: "" as unknown as MANUFACTURERS }),
  },
  {
    title: "Should NOT create product when use unknown manufacturer",
    product: generateProductData({ manufacturer: "Company" as unknown as MANUFACTURERS }),
  },
  {
    title: "Should NOT create product when price=0",
    product: generateProductData({ price: 0 }),
  },
  {
    title: "Should NOT create product when price is negative number",
    product: generateProductData({ price: -1 }),
  },
  {
    title: "Should NOT create product when price=100000",
    product: generateProductData({ price: 100000 }),
  },
  {
    title: "Should NOT create product when amount=1000",
    product: generateProductData({ amount: 1000 }),
  },
  {
    title: "Should NOT create product when amount is negative number",
    product: generateProductData({ amount: -1 }),
  },
  {
    title: "Should NOT create product when note is 251 characters",
    product: generateProductData({
      notes:
        "rzxbycrsczvcqxaeguojakqntwnxcbmtdkiiaqldrpcfmuibklxdfwlkthkbhesckdlojxmnnfufbcmtbjdhygcjcmsdfnfzdrojtnogdbincgufbrrxxsvlhsbzxoghriadueuxzidmbeilbuoicsbuingbkvgodfpouzmithgslropslvbezxugnmpvihyvmfoydcykevkzmpnbnhcdvslktnstyfkgjphbaqznntqfuswskczjeegiaa",
    }),
  },
  {
    title: "Should NOT create product when note contain symbols '<', '>'",
    product: generateProductData({
      notes: "<test>",
    }),
  },
];
