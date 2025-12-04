import dotenv from 'dotenv';
import { connect } from 'http2';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') })

const config={
   connectionString: `${process.env.CONNECTION_STR}`,
   port: process.env.PORT ,
   jwt_secrete:process.env.JWT_SECRETE
}

export default config;