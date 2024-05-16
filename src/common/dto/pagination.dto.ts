import { ApiProperty } from "@nestjs/swagger";

import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
    
    @ApiProperty({
        required: false,
        type: Number,
        description: 'Maximum number of items to retrieve (optional)',
        minimum: 1,
        maximum: 100,
        example: 10,
    })
    @IsOptional()
    @IsInt({ message: 'Limit must be an integer.' })
    @Min(1, { message: 'Limit must be greater than or equal to 1.' })
    @Max(100, { message: 'Limit cannot exceed 100.' })
    limit?: number;

    @ApiProperty({
        required: false,
        type: Number,
        description: 'Number of items to skip (optional)',
        minimum: 0,
        example: 0,
    })
    @IsOptional()
    @IsInt({ message: 'Offset must be an integer.' })
    @Min(0, { message: 'Offset must be greater than or equal to 0.' })
    offset?: number;

}