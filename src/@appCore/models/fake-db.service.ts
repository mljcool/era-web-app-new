import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from './dummies';
import { ECommerceFakeDb } from './dummiesOrder';
import { ContactsFakeDb } from './contacts';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {

            // Calendar
            'calendar': CalendarFakeDb.data,
            'e-commerce-orders': ECommerceFakeDb.orders,
            'e-commerce-products': ECommerceFakeDb.products,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user': ContactsFakeDb.user,

        };
    }
}
