import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {
  transform(categoryId: number): string {
    // In a real app, you might get this from a service
    const categories = [
      { id: 1, name: 'Technology' },
      { id: 2, name: 'Art & Creative' },
      { id: 3, name: 'Social Causes' },
      { id: 4, name: 'Entrepreneurship' }
    ];
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  }
}