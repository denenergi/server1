import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { TransactionService } from "../transaction/transaction.service";
import { CategoryService } from "../category/category.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(private readonly transactionService: TransactionService, private readonly categoryService: CategoryService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id, type } = request.params;
        console.log(type)
        let entity;

        switch (type) {
            case 'transactions':
                entity = await this.transactionService.findOne(id)
                break;
            case 'category':
                entity = await this.categoryService.findOne(id)
                break
            default:
                throw new NotFoundException('Something went wrong...')
        }

        const user = request.user

        if (entity && user && entity.user.id === user.id) {            
            return true
        }

        throw new BadRequestException('Not you')
    }
}