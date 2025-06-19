import {resend} from '@/lib/resend'

import { ApiResponce } from '../../types/ApiResponce'

export async function sendVerificaitonEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponce> {
    
}