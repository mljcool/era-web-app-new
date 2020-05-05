import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from './dummies';
import { ECommerceFakeDb } from './dummiesOrder';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {

            // Calendar
            'calendar': CalendarFakeDb.data,
            'e-commerce-orders': ECommerceFakeDb.orders,

        };
    }
}