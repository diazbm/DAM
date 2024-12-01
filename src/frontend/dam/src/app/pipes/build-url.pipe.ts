import { routes } from '../app.routes';
import { Pipe, PipeTransform } from '@angular/core';

const basePaths = routes.map(route => {
  return {
    title: route.title,
    uri: `/${route.path?.replace(':id', '')}`
  }
})

@Pipe({
  name: 'buildUrl',
  standalone: true
})
export class BuildUrlPipe implements PipeTransform {
  transform(id: number, uriTitle: string): string {
    const basePath = basePaths.find(b => b.title === uriTitle)
    if (basePath) return `${basePath.uri}${id}`
    return '/home'
  }
}
