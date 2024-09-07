import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  image: z.any().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  stock: z.number().min(0, {
    message: "Stock cannot be negative.",
  }),
  tags: z.string().optional(),
  regularPrice: z.number().min(0, {
    message: "Price cannot be negative.",
  }),
  salePrice: z.number().min(0, {
    message: "Sale price cannot be negative.",
  }),
});
