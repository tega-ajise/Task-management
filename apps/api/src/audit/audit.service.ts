import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditService {
    
    list(){
        return "audit list";
    }
}
