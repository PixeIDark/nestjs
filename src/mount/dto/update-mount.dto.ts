import { PartialType } from '@nestjs/mapped-types';
import { CreateMountDto } from './create-mount.dto';

export class UpdateMountDto extends PartialType(CreateMountDto) {}
