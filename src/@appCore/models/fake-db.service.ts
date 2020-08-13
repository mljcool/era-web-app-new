import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from './dummies';
import { ECommerceFakeDb } from './dummiesOrder';
import { ContactsFakeDb } from './contacts';
import { AllShopServices } from './shop-services-list';
import { AssistanceFakeDb } from './FakDBAssistance';

export class FakeDbService implements InMemoryDbService {


    createDb(): any {
        return {

            // Calendar
            'calendar': CalendarFakeDb.data,
            'e-commerce-orders': ECommerceFakeDb.orders,
            'e-commerce-products': ECommerceFakeDb.products,
            'all-shop-services': AllShopServices.products,
            'all-assistance': AssistanceFakeDb.assistanceList,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user': ContactsFakeDb.user,

        };
    }
}
