import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, hashHistory } from 'react-router';

import EventsPage from './flux/pages/events.jsx';
import EventList from './flux/components/events/event-list.jsx';
import EventSingle from './flux/components/events/event-single.jsx';

export default class AppRouter{

	run($content){

		let router = (
			<Router history={hashHistory}>
				<Route component={EventsPage}>
					<Route name="events" path="/events" component={EventList}/>
					<Route name="events-new" path="/events/new" component={EventSingle}/>
				</Route>
				<Redirect from="/" to="events" />
			</Router>
		);

		ReactDOM.render(router, $content);
	}

}