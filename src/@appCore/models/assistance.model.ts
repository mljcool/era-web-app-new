import { FuseUtils } from '@fuse/utils';

export class IAssistance {
  id: string;
  name: string;
  mobileNumber: string;
  assistanceTypeName: string;
  assistanceWrittenAddress: string;
  email: string;
  notes: string;
  displayName?: string;

  /**
   * Constructor
   *
   * @param contact
   */
  constructor(contact) {
    {
      this.id = contact.id || FuseUtils.generateGUID();
      this.name = contact.name || '';
      this.email = contact.email || '';
      this.mobileNumber = contact.mobileNumber || '';
      this.assistanceTypeName = contact.assistanceTypeName || '';
      this.assistanceWrittenAddress = contact.assistanceWrittenAddress || '';
      this.notes = contact.notes || '';
    }
  }
}
