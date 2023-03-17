import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ThrottlingTestVeryLarge from './components/ThrottlingTestVeryLarge';
import { IThrottlingTestVeryLargeProps } from './components/IThrottlingTestVeryLargeProps';

import { getSP } from '../../pnpConfig/pnpConfig';

export interface IThrottlingTestVeryLargeWebPartProps {
  description: string;
}

export default class ThrottlingTestVeryLargeWebPart extends BaseClientSideWebPart<IThrottlingTestVeryLargeWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IThrottlingTestVeryLargeProps> = React.createElement(
      ThrottlingTestVeryLarge,
      {
      
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    
    getSP(this.context);
  }
 
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}
