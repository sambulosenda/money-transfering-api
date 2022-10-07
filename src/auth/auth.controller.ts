import { Controller, Inject, Post } from "@nestjs/common";
import { Routes, Services } from "src/utils/constants";

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
    ){}
    @Post('register')
    registerUser(){

    }
}
