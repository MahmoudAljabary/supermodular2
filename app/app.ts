import { Component } from '@angular/core';

import { App, Platform, IONIC_DIRECTIVES, MenuController, Nav, ionicBootstrap } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import 'rxjs/add/operator/map';

import { HomePage } from './pages/home/home.page';
import { WordpressListPage } from './pages/wordpress/list/wordpress.list.page';
import { SlideBoxPage } from './pages/slide-box/slide-box.page';
import { GoogleMapsPage } from './pages/google-maps/google-maps.page';
import { Config } from './config';
import { EmailService } from './services/email.service.ts';
import { CallService } from './services/call.service';
import { MapsService } from './services/maps.service';
import { InAppBrowserService } from './services/in-app-browser.service';

@Component({
	templateUrl: 'build/app.html',
	directives: [IONIC_DIRECTIVES]
})
class MyApp {
	private app;
	private platform;
	private pages;
	private rootPage;
	private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

	constructor(app: App, platform: Platform, menu: MenuController) {
		this.menu = menu;
		// set up our app
		this.app = app;
		this.platform = platform;
		this.initializeApp();

		// set our app's pages
		this.pages = [
			{ title: 'Home', component: HomePage, icon: 'home' },
			{ title: 'Wordpress', component: WordpressListPage, icon: 'logo-wordpress' },
			{ title: 'Slides', component: SlideBoxPage, icon: 'swap' },
			{ title: 'Google maps', component: GoogleMapsPage, icon: 'map' }
		];

		this.rootPage = HomePage;
	}

	initializeApp() {
		this.platform.ready().then(() => {
			console.log('Platform ready');

			// The platform is now ready. Note: if this callback fails to fire, follow
			// the Troubleshooting guide for a number of possible solutions:
			//
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			//
			// First, let's hide the keyboard accessory bar (only works natively) since
			// that's a better default:
			//
			//
			// For example, we might change the StatusBar color. This one below is
			// good for light backgrounds and dark text;
			if (typeof window.StatusBar !== 'undefined') {
				window.StatusBar.styleDefault();
			}
		});
	}

	openPage(page) {
		// close the menu when clicking a link from the menu
		this.menu.close();
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page.component);
	}
}

ionicBootstrap(MyApp, [
	Config, EmailService, CallService, MapsService, InAppBrowserService
]);