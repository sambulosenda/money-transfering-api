import { HttpException, HttpStatus } from "@nestjs/common";

export class UserFoundException extends HttpException{ 
    constructor() {
        super('User Exists', HttpStatus.CONFLICT)
    }
}