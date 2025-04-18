import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category successfully created.' })
    create(@CurrentUser() user: any, @Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(user.id, createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Returns all categories for the user.' })
    findAll(@CurrentUser() user: any) {
        return this.categoriesService.findAll(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a category by id' })
    @ApiResponse({ status: 200, description: 'Returns the specified category.' })
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.categoriesService.findOne(user.id, +id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category' })
    @ApiResponse({ status: 200, description: 'Category successfully updated.' })
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(user.id, +id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiResponse({ status: 200, description: 'Category successfully deleted.' })
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.categoriesService.remove(user.id, +id);
    }
}