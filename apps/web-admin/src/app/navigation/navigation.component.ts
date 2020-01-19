import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';

export interface INavItem {
  label: string;
  url: string;
  selected: boolean;
}

@Component({
  selector: 'nx-home-assistant-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  navData$: Observable<INavItem[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.navData$ = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
      map(() =>
        this.router.config
          .filter(v => !!v.data && !!v.data.label)
          .reduce(
            (acc, route) => {
              const activeRoute = this.isRouteActive(route);
              acc.push({
                label: route.data.label,
                url: `/${route.path}`,
                selected: activeRoute
              });

              return acc;
            },

            []
          )
      )
    );
  }

  private isRouteActive(route: Route, prefix?: string): boolean {
    const path = [prefix, route.path]
      .filter(p => typeof p === 'string')
      .join('/');
    return (
      this.router.isActive(path, true) ||
      (route.children || []).some(child => this.isRouteActive(child, path))
    );
  }
}
