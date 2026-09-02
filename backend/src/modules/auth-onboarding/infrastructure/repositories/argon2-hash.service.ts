import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { IHashService } from '../../domain/providers/hash.service.interface';

@Injectable()
export class Argon2HashService implements IHashService {
  async hash(plainText: string): Promise<string> {
    return argon2.hash(plainText, {
      type: argon2.argon2id, // Algoritmo recomendado pela OWASP
      memoryCost: 2 ** 16, // 64 MB de RAM por hash
      timeCost: 3, // 3 iterações de tempo
      parallelism: 1, // 1 thread
    });
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    // argon2.verify espera (hash, textoPlano)
    return argon2.verify(hashedText, plainText);
  }
}
