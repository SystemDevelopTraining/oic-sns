import { Sex } from './user.sex';
import { IsNotEmpty, IsIn, MinDate, MaxDate, IsOptional } from 'class-validator';


const maxDate = new Date();
maxDate.setFullYear(maxDate.getFullYear() - 16);

const minDate = new Date();
minDate.setFullYear(maxDate.getFullYear() - 100);

export class UserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsIn(["男", "女"])
  sex: Sex;

  @IsOptional()
  @MaxDate(maxDate)
  @MinDate(minDate)
  birthday?: Date;

  note?: string;
}
