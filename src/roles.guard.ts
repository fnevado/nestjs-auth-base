import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./decorators";
import { Role } from "./users/role.entity";
import { UsersService } from "./users/users.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userService: UsersService
        ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

        if (!requiredRoles){
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        return this.checkRoles(user.username, requiredRoles);
    }

    private async checkRoles(username: string, roles: string[]): Promise<boolean> {
        var result = false;
        
        const user = await this.userService.findOne(username);
        console.log(user.roles);

        for (let index = 0; index < roles.length; index++) {
            const roleDesc = roles[index];

            if (user.roles.findIndex(x => x.description == roleDesc) != -1){    
                result = true;
                break;
            }
        }

        return result;
    }

}