import { FuseUtils } from '@fuse/utils';

export class Mechanics {
    id: string;
    name: string;
    lastName: string;
    nickname: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    birthday: string;
    notes: string;

    /**
     * Constructor
     *
     * @param contact
     */
    constructor(contact) {
        {
            this.id = contact.id || FuseUtils.generateGUID();
            this.name = contact.name || '';
            this.lastName = contact.lastName || '';
            this.nickname = contact.nickname || '';
            this.jobTitle = contact.jobTitle || '';
            this.email = contact.email || '';
            this.phone = contact.phone || '';
            this.address = contact.address || '';
            this.birthday = contact.birthday || '';
            this.notes = contact.notes || '';
        }
    }
}
