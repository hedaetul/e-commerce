import * as z from "zod";

export const formSchema = z.object({
  id: z.string().min(0, "Product Id is required."),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  photo: z.any(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  stock: z.number().min(0, {
    message: "Stock cannot be negative.",
  }),
  brand: z.string().optional(),

  price: z.number().min(0, {
    message: "Sale price cannot be negative.",
  }),
});
