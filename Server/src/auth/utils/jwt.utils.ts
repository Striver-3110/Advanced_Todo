import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtUtils{
    constructor(private readonly jwtService: JwtService){}

    generateToken(payload:any):string{
        return this.jwtService.sign(payload)
    }
    verifyToken(token: any){
        return this.jwtService.verify(token);
    }
}