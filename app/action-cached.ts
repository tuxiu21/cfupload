'use server'

import { verifySession } from "@/lib/dal"
import { cache } from "react"

// cache的函数要分离开 因为middleware内部不能放cache的
export const verifySessionAction = cache(verifySession)
