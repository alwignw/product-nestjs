import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'myapi', // Ganti dengan kunci rahasia yang lebih aman
  signOptions: { expiresIn: '1h' }, // Atur waktu kedaluwarsa token sesuai kebutuhan Anda
};
