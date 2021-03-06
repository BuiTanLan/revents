import { Button, Icon, Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemImage, List, Segment, SegmentGroup } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Event } from '../../../models/event';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store/configureStore';
import { remove } from '../eventSlice';

interface Props {
	event: Event;
}
export default function EventListItem(props: Props) {
	const dispatch: AppDispatch = useDispatch();
    return (
			<SegmentGroup>
				<Segment>
					<ItemGroup>
						<Item>
							<ItemImage size='tiny' circular src={props.event.hostPhotoURL} />
							<ItemContent>
								<ItemHeader content={props.event.title}/>
								<ItemDescription>Hosted by {props.event.hostedBy}</ItemDescription>
							</ItemContent>
						</Item>
					</ItemGroup>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock' /> {props.event.date}
						<Icon name='marker' /> {props.event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{props.event.attendees.map((attendee) => (
							<EventListAttendee key={attendee.id} attendee={attendee} />
						))}
					</List>
				</Segment>
				<Segment clearing>
					<div> {props.event.description}</div>
					<Button
						onClick={() => dispatch(remove(props.event.id))}
						color='red'
						floated='right'
						content='Delete'
					/>
					<Button
						as={Link} to={`/events/${props.event.id}`}
						color='teal'
						floated='right'
						content='View'
					/>
				</Segment>
			</SegmentGroup>
		);
}
