
import { z } from "zod";

  const productSchema = z.object({
    name: z.string().min(3, "Artikal mora imati najmanje 3 karaktera"),
       price: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, 'Cijena mora biti validan broj sa do 2 decimalne tačke'),
    });

    type Product = z.infer<typeof productSchema>;
  export default productSchema; ;












  // const GostSchema = z.object({
//     name: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   name: z.string().min(4, 'Product name is required'),
//   price: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to 2 decimal places'),
// });// const GostSchema = z.object({
//     name: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   name: z.string().min(4, 'Product name is required'),
//   price: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number with up to 2 decimal places'),
// });
