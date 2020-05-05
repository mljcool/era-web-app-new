import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from './dummies';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {

            // Calendar
            'calendar': CalendarFakeDb.data,

        };
    }
}
