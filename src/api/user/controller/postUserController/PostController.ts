import { userPostSchema } from "../../schema/post/postUser";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUser } from "../../model/User";
import { BaseController } from "../../../../core/baseController/BaseController";
import { USER_REPOSITORIES } from "../../ioc/UserTypes";
import { IPostUserController } from "./IPostController";

@injectable()
export class PostUserController extends BaseController implements IPostUserController {

    @inject(USER_REPOSITORIES.IUserRepository)
    private readonly _userRepository: IUserRepository;

    async process(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, userPostSchema);
        const user: IUser = await this._userRepository.insertOne(req.body);

        return res.json(SuccessResponse.Created(user));
    }
}
