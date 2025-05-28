import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class StudentQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @Type(() => Number)
  @IsOptional()
  page: number;

  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsOptional()
  search?: string;
}

// import { IsOptional, IsString } from 'class-validator';

// export class StudentQueryDto {
//   @IsOptional()
//   @IsString()
//   school_id: string;

//   @IsOptional()
//   page: number;

//   @IsOptional()
//   limit: number;

//   @IsOptional()
//   @IsString()
//   search?: string;
// }
