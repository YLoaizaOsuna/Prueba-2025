import { IsBoolean } from 'class-validator'; //* SE crea el dto blocked-user.dto (isBlocked paso 3)

export class BlockedUserDto {
  @IsBoolean()
  isBlocked: boolean;
}
