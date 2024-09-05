// import { z } from "zod";
// // z.string().trim(); // 减除空白
// export const LoginFormSchema=z.object({
//   username:z
//   .string()
//   .min(2, { message: 'Name must be at least 2 characters long.' })
//   .trim(),
//   password:z
//   .string()
//   .min(4, { message: 'Password must be at least 4 characters long.' })
//   .trim()
// })

// export type LoginFormState= | {
//   errors?: {
//     usernmae?: string[]
//     password?: string[]
//   }
//   message?: string
// }
// | undefined