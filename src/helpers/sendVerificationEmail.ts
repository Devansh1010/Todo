import {resend} from '@/lib/resend'

import { ApiResponce } from '../../types/ApiResponce'
import { NextResponse } from 'next/server'
import { success } from 'zod/v4'

export async function sendVerificaitonEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponce> {
    try {

            
    } catch (error) {
      
    }
}