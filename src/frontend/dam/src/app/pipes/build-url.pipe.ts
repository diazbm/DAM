import { routes } from '../app.routes';
import { Pipe, PipeTransform } from '@angular/core';

const basePaths = routes.map(route => {
  return {
    title: route.title,
    uri: `/${route.path?.split('/')[0]}`
  }
})

@Pipe({
  name: 'buildUrl',
  standalone: true
})
export class BuildUrlPipe implements PipeTransform {
  transform(ids: number[], uriTitle: string): string {
    const basePath = basePaths.find(b => b.title === uriTitle)
    if (basePath) {
      if (ids.length === 1) return `${basePath.uri}/${ids[0]}`
      if (ids.length === 2) return `${basePath.uri}/${ids[0]}/${ids[1]}`
      return basePath.uri
    }
    return '/'
  }
}
