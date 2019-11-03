import { userPostSchema } from "../../schema/post/postUser";
import { Request, Response } from "express";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUser } from "../../model/User";
import { USER_REPOSITORIES } from "../../ioc/UserTypes";
import { IPostUserController } from "./IPostController";
import { TYPES } from "../../../../ioc/types";
import { IValidator } from "../../../../core/validator/IValidator";

@injectable()
export class PostUserController implements IPostUserController {

    @inject(USER_REPOSITORIES.IUserRepository)
    private readonly _userRepository: IUserRepository;

    @inject(TYPES.IValidator)
    protected readonly _validator: IValidator;

    async process(req: Request, res: Response): Promise<Response> {
        this._validator.validate(req.body, userPostSchema);
        const user: IUser = await this._userRepository.insertOne(req.body);

        return res.json(SuccessResponse.Created(user));
    }
}
