import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
    route:string;
    name: string
}

@Component({
    standalone: true,
    selector: 'side-menu',
    imports: [ CommonModule, RouterModule ],
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

    public menuItems: MenuItem[] = [
        { route: "/maps/fullscreen", name:"Full Screen" },
        { route: "/maps/zoom-range", name:"Zoom Range" },
        { route: "/maps/markers", name:"Merkers" },
        { route: "/maps/properties", name:"Properties" },
        { route: "/alone", name:"Alone Page" },
    ]
}
