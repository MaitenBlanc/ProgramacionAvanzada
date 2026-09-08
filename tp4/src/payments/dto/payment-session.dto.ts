import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min, ValidateNested } from "class-validator";

export class PaymentSessionItemDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;
}

export class PaymentSessionDTO {
    @IsNotEmpty()
    @IsString()
    orderId: string;

    @IsString()
    currency: string;

    @IsArray()
    @Type(() => PaymentSessionItemDTO)
    @ValidateNested({ each: true })
    items: PaymentSessionItemDTO[];
}